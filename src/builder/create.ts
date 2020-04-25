import Base from "./base";
import { TableOptions } from "../constant/enum";
import { TABLE_OPT_VALUES, FEILD_TEMPLATE } from "../constant/constant";
import { DialectTypes } from "../constant/enum";
import { Type } from "schema-verify";
import { tableInfoVerify } from "../verify/builder/index";
import { analyTmpl } from "../util/util";
import ErrMsg from "../error/builder/index";

export interface TableField {
    field: string;
    type: string;
    unsigned?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    default?: string | number;
    onUpdate?: string;
    comment?: string;
}
export interface combineKey {
    keyName: string;
    combineFields: string[];
}
export interface TableInfo {
    tableName: string;
    primaryKey: string | combineKey;
    uniqueKey?: string | combineKey;
    engine?: string;
    autoIncrement?: number;
    defaultCharset?: string;
    comment?: string;
    fields: TableField[];
}

const TABLE_TEMPLATE = `CREATE TABLE IF NOT EXISTS {{tableName}}( {{feildsStr}}) {{tableOptionsStr}}`;
const TABLE_OPTIONS_TEMPLATE = `{{engine}}{{autoIncrement}}{{defaultCharset}}{{comment}}`;
const DATABASE_TEMPLATE = `CREATE DATABASE {{dbName}}`;

class Create extends Base {
    protected createTableSqlStr: string;
    protected createDbName: string;
    protected createTableInfo: TableInfo;
    constructor() {
        super();
    }

    checkDialect() {
        const dialectType: DialectTypes = this._dialectType;
        if (dialectType !== DialectTypes.mysql) {
            throw new Error(ErrMsg.notSupportDialect);
        }
    }

    info(tableInfo: TableInfo | string): this {
        if (Type.string.isNotEmpty(tableInfo)) {
            this.createTableSqlStr = <string>tableInfo;
        } else if (tableInfoVerify(tableInfo, true)) {
            this.createTableInfo = <TableInfo>tableInfo;
        }
        return this;
    }

    dataBase(dbName: string): this {
        if (!Type.string.isNotEmpty(dbName)) {
            throw new Error(ErrMsg.errorCreateDbName);
        }
        this.createDbName = dbName;
        return this;
    }

    build(): string {
        const createDbName: string = this.createDbName;
        if (Type.string.isNotEmpty(createDbName)) {
            const tmplOpts = {
                dbName: createDbName,
            };
            const query: string = analyTmpl(DATABASE_TEMPLATE, tmplOpts);
            return query;
        }
        const tableSqlStr: string = this.createTableSqlStr;
        if (Type.string.isNotEmpty(tableSqlStr)) {
            return tableSqlStr;
        }
        const tableInfo: TableInfo = this.createTableInfo;
        tableInfoVerify(tableInfo, true);
        const query: string = this.tableTmpl(tableInfo);
        return query;
    }

    protected tableTmpl(info: TableInfo): string {
        const tableName: string = info.tableName;
        const feildsStr: string = this.feildsStr(info);
        const tableOptionsStr: string = this.tableOptsStr(info);
        const tmplOpts = {
            tableName,
            feildsStr,
            tableOptionsStr,
        };
        const tableInfoStr: string = analyTmpl(TABLE_TEMPLATE, tmplOpts) + ";";
        return tableInfoStr;
    }

    protected feildsStr(info: TableInfo): string {
        const primaryKey: string | combineKey = info.primaryKey;
        const uniqueKey: string | combineKey = info.uniqueKey;
        const fields: TableField[] = info.fields;
        const feildTmplArr: string[] = [];

        for (const fieldInfo of fields) {
            const feildStr: string = this.feildTmpl(fieldInfo);
            feildTmplArr.push(feildStr);
        }

        const primaryKeyStr: string = this.primaryKeyStr(primaryKey);
        const uniqueKeyStr: string = this.uniqueKeyStr(uniqueKey);

        if (Type.string.isNotEmpty(primaryKeyStr)) {
            feildTmplArr.push(primaryKeyStr);
        }

        if (Type.string.isNotEmpty(uniqueKeyStr)) {
            feildTmplArr.push(uniqueKeyStr);
        }

        return feildTmplArr.join(",");
    }

    protected feildTmpl(fieldInfo: TableField): string {
        const field: string = this.safeKey(fieldInfo.field);
        const type: string = fieldInfo.type.toUpperCase();
        const unsigned: boolean = fieldInfo.unsigned;
        const notNull: boolean = fieldInfo.notNull;
        let defaultValue: string | number = fieldInfo.default;
        const autoIncrement: boolean = fieldInfo.autoIncrement;
        const onUpdate: string = fieldInfo.onUpdate;
        let comment: string = fieldInfo.comment;

        const tmplOpts: any = {
            field,
            type,
        };

        if (unsigned === true) {
            tmplOpts["unsigned"] = TableOptions.unsigned;
        }

        if (notNull === true) {
            tmplOpts["notNull"] = TableOptions.notNull;
        }

        if (Type.string.is(defaultValue) || Type.number.is(defaultValue)) {
            let needSafe = true;
            let upperValue;
            if (Type.string.is(defaultValue)) {
                upperValue = (<string>defaultValue).toUpperCase();
                needSafe = !TABLE_OPT_VALUES.includes(upperValue);
            }
            defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
            tmplOpts["default"] = `${TableOptions.default} ${defaultValue}`;
        }

        if (autoIncrement === true) {
            tmplOpts["autoIncrement"] = TableOptions.autoIncrement;
        }

        if (Type.string.isNotEmpty(onUpdate)) {
            tmplOpts["onUpdate"] = `${TableOptions.onUpdate} ${onUpdate}`;
        }

        if (Type.string.isNotEmpty(comment)) {
            comment = this.safeValue(comment);
            tmplOpts["comment"] = `${TableOptions.comment} ${comment}`;
        }

        const feildStr: string = analyTmpl(FEILD_TEMPLATE, tmplOpts);

        return feildStr;
    }

    protected primaryKeyStr(keyInfo: string | combineKey): string {
        let result: string;
        const primaryKey = TableOptions.primaryKey;

        if (Type.string.isNotEmpty(keyInfo)) {
            const value = this.safeKey(<string>keyInfo);
            result = `${value} ${primaryKey} (${value})`;
        }

        if (Type.object.is(keyInfo)) {
            const keyName: string = this.safeKey((<combineKey>keyInfo).keyName);
            const combineFields = (<combineKey>keyInfo).combineFields;
            const combineFieldsStr = combineFields
                .map((field) => this.safeKey(field))
                .join(",");
            result = `${keyName} ${primaryKey} (${combineFieldsStr})`;
        }

        return `${TableOptions.constraint} ${result}`;
    }

    protected uniqueKeyStr(keyInfo: string | combineKey): string {
        let result: string;
        const uniqueKey = TableOptions.uniqueKey;

        if (Type.string.isNotEmpty(keyInfo)) {
            const value = this.safeKey(<string>keyInfo);
            result = `${value} ${uniqueKey} (${value})`;
        }

        if (Type.object.is(keyInfo)) {
            const keyName: string = this.safeKey((<combineKey>keyInfo).keyName);
            const combineFields = (<combineKey>keyInfo).combineFields;
            const combineFieldsStr = combineFields
                .map((field) => this.safeKey(field))
                .join(",");
            result = `${keyName} ${uniqueKey} (${combineFieldsStr})`;
        }

        return `${TableOptions.constraint} ${result}`;
    }

    protected tableOptsStr(info: TableInfo): string {
        const engine: string = info.engine;
        const autoIncrement: number = info.autoIncrement;
        const defaultCharset: string = info.defaultCharset;
        const comment = info.comment;
        const tmplOpts: any = {};

        if (Type.string.isNotEmpty(engine)) {
            const key = TableOptions.engine;
            const value = engine;
            tmplOpts["engine"] = `${key}=${value}`;
        }

        if (Type.number.is(autoIncrement)) {
            const key = TableOptions.autoIncrement;
            const value = autoIncrement;
            tmplOpts["autoIncrement"] = `${key}=${value}`;
        }

        if (Type.string.isNotEmpty(defaultCharset)) {
            const key = TableOptions.defaultCharset;
            const value = defaultCharset;
            tmplOpts["defaultCharset"] = `${key}=${value}`;
        }

        if (Type.string.isNotEmpty(comment)) {
            const key = TableOptions.comment;
            const value = this.safeValue(comment);
            tmplOpts["comment"] = `${key}=${value}`;
        }
        const tableOptionsStr: string = analyTmpl(
            TABLE_OPTIONS_TEMPLATE,
            tmplOpts
        );
        return tableOptionsStr;
    }
}

export default Create;
