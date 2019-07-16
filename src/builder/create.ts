import Safe from "./safe";
import { TableOptions } from "../constant/enum";
import { TableInfo, combineKey, TableField } from "../constant/interface";
import { Type } from "schema-verify";
import { tableInfoVerify } from "../verify/builder/index";
import { analyTmpl } from "../util/util";

const TABLE_TEMPLATE = `CREATE TABLE {{tableName}} ( {{feildsStr}} ) {{tableOptionsStr}}`;
const TABLE_OPTIONS_TEMPLATE = `{{engine}} {{autoIncrement}} {{defaultCharset}} {{comment}}`;
const FEILD_TEMPLATE = `{{field}} {{type}} {{unsigned}} {{notNull}} {{default}} {{autoIncrement}} {{onUpdate}} {{comment}}`;

class Create extends Safe {
    protected createTableSqlStr: string;
    protected createTableInfo: TableInfo;
    constructor() {
        super();
    }

    info(tableInfo: TableInfo | string) {
        if (Type.string.isNotEmpty(tableInfo)) {
            this.createTableSqlStr = <string>tableInfo;
        } else if (tableInfoVerify(tableInfo, true)) {
            this.createTableInfo = <TableInfo>tableInfo;
        }
        return this;
    }

    build(): string {
        const tableSqlStr: string = this.createTableSqlStr;
        if (Type.string.isNotEmpty(tableSqlStr)) {
            return tableSqlStr;
        }
        const tableInfo: TableInfo = this.createTableInfo;
        tableInfoVerify(tableInfo, true);
        const query: string = this.tableTmpl(tableInfo);
        return query;
    }

    tableTmpl(info: TableInfo): string {
        const tableName: string = info.tableName;
        const feildsStr: string = this.feildsStr(info);
        const tableOptionsStr: string = this.tableOptsStr(info);
        const tmplOpts = {
            tableName,
            feildsStr,
            tableOptionsStr
        };
        const tableInfoStr: string = analyTmpl(TABLE_TEMPLATE, tmplOpts);

        return tableInfoStr;
    }

    feildsStr(info: TableInfo): string {
        const primaryKey: string | combineKey = info.primaryKey;
        const uniqueKey: string | combineKey = info.uniqueKey;
        const fields: TableField[] = info.fields;
        const feildTmplArr: string[] = [];

        for (const fieldInfo of fields) {
            const feildStr = this.feildTmpl(fieldInfo);
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

    feildTmpl(fieldInfo: TableField): string {
        const field: string = this.safeKey(fieldInfo.field);
        const type: string = fieldInfo.type;
        const unsigned: boolean = fieldInfo.unsigned;
        const notNull: boolean = fieldInfo.notNull;
        let defaultValue: string | number = fieldInfo.default;
        const autoIncrement: boolean = fieldInfo.autoIncrement;
        const onUpdate: string = fieldInfo.onUpdate;
        let comment: string = fieldInfo.comment;

        const tmplOpts = {
            field,
            type
        };

        if (unsigned === true) {
            tmplOpts["unsigned"] = TableOptions.unsigned;
        }

        if (notNull === true) {
            tmplOpts["notNull"] = TableOptions.notNull;
        }

        if (Type.string.is(defaultValue) || Type.number.is(defaultValue)) {
            defaultValue = this.safeValue(defaultValue);
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

    primaryKeyStr(keyInfo: string | combineKey): string {
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
                .map(field => this.safeKey(field))
                .join(",");
            result = `${keyName} ${primaryKey} (${combineFieldsStr})`;
        }

        return `${TableOptions.constraint} ${result}`;
    }

    uniqueKeyStr(keyInfo: string | combineKey): string {
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
                .map(field => this.safeKey(field))
                .join(",");
            result = `${keyName} ${uniqueKey} (${combineFieldsStr})`;
        }

        return `${TableOptions.constraint} ${result}`;
    }

    tableOptsStr(info: TableInfo): string {
        const engine: string = info.engine;
        const autoIncrement: number = info.autoIncrement;
        const defaultCharset: string = info.defaultCharset;
        const comment = info.comment;
        const tmplOpts = {};

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
