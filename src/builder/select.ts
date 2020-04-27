import { argStrArrTrans } from "../util/util";
import Join from "./join";
import { KeyValueStr } from "../constant/interface";
import { QueryTypes } from "../constant/enum";
import { Type } from "schema-verify";
import { strArrVerify, strObjVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

class Select extends Join {
    protected selectFields: string[];
    protected fieldsAsMap: KeyValueStr;
    constructor() {
        super();
        this.selectFields = [];
        this.fieldsAsMap = {};
    }

    protected formatFields(): string[] {
        const fields: string[] = Type.array.safe(this.selectFields);
        const asMap: KeyValueStr = Type.object.safe(this.fieldsAsMap);
        const result: string[] = [];
        for (const field of fields) {
            if (!Type.string.isNotEmpty(field)) {
                continue;
            }
            const safeField = field !== "*" ? this.safeKey(field) : "*";
            if (Type.string.isNotEmpty(asMap[field])) {
                const safeAsField = this.safeKey(asMap[field]);
                result.push(`${safeField} AS ${safeAsField}`);
            } else {
                result.push(safeField);
            }
        }
        return result;
    }

    protected formatFieldStr(): string {
        let fields: string[] = this.formatFields();
        let joinFields: string[] = this.formatJoinFields();
        let funcs: string[] = this.formatFuncs();
        let result: string;
        if (
            strArrVerify(fields) ||
            strArrVerify(funcs) ||
            strArrVerify(joinFields)
        ) {
            fields = Type.array.safe(fields);
            joinFields = Type.array.safe(joinFields);
            funcs = Type.array.safe(funcs);
            result = (<string[]>[]).concat(fields, joinFields, funcs).join(", ");
        } else {
            result = "*";
        }
        return result;
    }

    protected formatTableStr(): string {
        const tablesStr: string = this.getQueryTables();
        if (Type.string.isNotEmpty(tablesStr)) {
            return tablesStr;
        }
        const table: string = this.getQueryTable();
        return table;
    }

    build(): string {
        const table: string = this.formatTableStr();
        const fieldsStr: string = this.formatFieldStr();
        let query: string = `${QueryTypes.select} ${fieldsStr} FROM ${table}`;
        query = this.whereBuild(query);
        query = this.groupBuild(query);
        query = this.havingBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        query = this.joinBuild(query);
        return query;
    }

    fields(arg: any, ...otherArgs: any[]): this {
        const selectFields: string[] = Type.array.safe(this.selectFields);
        const args: any[] = argStrArrTrans(arg, otherArgs);
        const fields: string[] = [];
        for (const item of args) {
            if (Type.object.isNotEmpty(item)) {
                this.funcFeilds(item);
                continue;
            }
            if (Type.string.isNotEmpty(item)) {
                fields.push(item);
            }
        }
        this.selectFields = Array.from(new Set(selectFields.concat(fields)));
        if (this.selectFields.includes("*")) {
            this.selectFields = ["*"];
        }
        return this;
    }

    asMap(map: KeyValueStr): this {
        const asMap: KeyValueStr = Type.object.safe(this.fieldsAsMap);
        if (!strObjVerify(map)) {
            throw new Error(ErrMsg.errorFieldMap);
        }
        this.fieldsAsMap = Object.assign({}, asMap, map);
        return this;
    }

    limit(offset: number, step?: number): this {
        this.getLimitCase().limit(offset, step);
        return this;
    }

    paging(page: number, size: number): this {
        this.getLimitCase().paging(page, size);
        return this;
    }

    findOne(): this {
        this.getLimitCase().step(1);
        return this;
    }
}

export default Select;
