import Base from "./base";
import { TableOptions, AlterMethods, DialectTypes } from "../constant/enum";
import { TABLE_OPT_VALUES, FEILD_TEMPLATE } from "../constant/constant";
import { Type } from "schema-verify";
import { analyTmpl } from "../util/util";
import { alterInfosVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

const ALTER_TEMPLATE = `ALTER TABLE {{queryTable}}{{alterInfosStr}}`;
const ALTER_INFOS_TEMPLATE = `{{method}}COLUMN {{field}}{{alterFieldStr}}`;

export interface AlterField {
    field?: string;
    type?: string;
    unsigned?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    default?: string | number;
    onUpdate?: string;
    comment?: string;
}
interface AlterInfo {
    method: AlterMethods;
    field: string;
    alterField: AlterField;
}

class Alter extends Base {
    protected alterInfos: AlterInfo[] = [];
    constructor() {
        super();
    }

    checkDialect(): void {
        const dialectType: DialectTypes = this._dialectType;
        if (dialectType !== DialectTypes.mysql) {
            throw new Error(ErrMsg.notSupportDialect);
        }
    }

    add(field: string | AlterField, alterField: AlterField = {}): this {
        if (Type.object.is(field)) {
            alterField = <AlterField>field;
            field = alterField.field || "";
        }
        delete alterField["field"];
        return this.alterCache(AlterMethods.add, <string>field, alterField);
    }

    drop(field: string): this {
        return this.alterCache(AlterMethods.drop, field, {});
    }

    modify(field: string, alterField: AlterField): this {
        delete alterField["field"];
        return this.alterCache(AlterMethods.modify, field, alterField);
    }

    change(field: string, alterField: AlterField): this {
        return this.alterCache(AlterMethods.change, field, alterField);
    }

    protected alterCache(
        method: AlterMethods,
        field: string,
        alterField: AlterField
    ): this {
        if (
            AlterMethods.drop !== method &&
            !Type.object.isNotEmpty(alterField)
        ) {
            throw new Error(ErrMsg.errorAlterField);
        }
        const alterInfo: AlterInfo = {
            method,
            field,
            alterField,
        };
        if (!alterInfosVerify(alterInfo)) {
            throw new Error(ErrMsg.errorAlterField);
        }
        const alterInfos: AlterInfo[] = Type.array.safe(this.alterInfos);
        alterInfos.push(alterInfo);
        this.alterInfos = alterInfos;
        return this;
    }

    build(): string {
        const alterInfos: AlterInfo[] = Type.array.safe(this.alterInfos);
        const infosStrArr: string[] = [];

        for (const item of alterInfos) {
            if (!alterInfosVerify(item)) {
                continue;
            }
            const method: string = item.method;
            const field: string = this.safeKey(item.field);
            const alterField: AlterField = item.alterField;
            const alterFieldStr: string = this.feildTmpl(alterField);
            const tmplOpts = {
                method,
                field,
                alterFieldStr,
            };
            const alterInfoStr: string = analyTmpl(
                ALTER_INFOS_TEMPLATE,
                tmplOpts
            );
            infosStrArr.push(alterInfoStr);
        }

        if (!Type.array.isNotEmpty(infosStrArr)) {
            throw new Error(ErrMsg.emptyAlterInfos);
        }
        const alterInfosStr: string = infosStrArr.join(",");
        const queryTable = this.getQueryTable();
        const tmplOpts = {
            queryTable,
            alterInfosStr,
        };
        return analyTmpl(ALTER_TEMPLATE, tmplOpts);
    }

    protected feildTmpl(fieldInfo: AlterField): string {
        const field = fieldInfo.field;
        const type = fieldInfo.type;
        const unsigned = fieldInfo.unsigned;
        const notNull = fieldInfo.notNull;
        let defaultValue = fieldInfo.default;
        const autoIncrement = fieldInfo.autoIncrement;
        const onUpdate = fieldInfo.onUpdate;
        let comment = fieldInfo.comment;

        const tmplOpts: any = {};

        if (Type.string.isNotEmpty(field)) {
            tmplOpts["field"] = this.safeKey(<string>field);
        }

        if (Type.string.isNotEmpty(type)) {
            tmplOpts["type"] = (<string>type).toUpperCase();
        }

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
            defaultValue = needSafe
                ? this.safeValue(<string>defaultValue)
                : upperValue;
            tmplOpts["default"] = `${TableOptions.default} ${defaultValue}`;
        }

        if (autoIncrement === true) {
            tmplOpts["autoIncrement"] = TableOptions.autoIncrement;
        }

        if (Type.string.isNotEmpty(onUpdate)) {
            tmplOpts["onUpdate"] = `${TableOptions.onUpdate} ${onUpdate}`;
        }

        if (Type.string.isNotEmpty(comment)) {
            comment = this.safeValue(<string>comment);
            tmplOpts["comment"] = `${TableOptions.comment} ${comment}`;
        }

        return analyTmpl(FEILD_TEMPLATE, tmplOpts);
    }
}

export default Alter;
