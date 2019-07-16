import { argStrArrTrans } from "../util/util";
import Combine from "./combine";
import { KeyValueStr } from "../constant/interface";
import { QueryTypes } from "../constant/enum";
import { Type } from "schema-verify";
import { strArrVerify, strObjVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

class Select extends Combine {
    protected selectFields: string[];
    protected fieldsAsMap: KeyValueStr;
    readonly queryType: QueryTypes = QueryTypes.select;
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
        let funcs: string[] = this.formatFuncs();
        let result: string;
        if (strArrVerify(fields) || strArrVerify(funcs)) {
            fields = Type.array.safe(fields);
            funcs = Type.array.safe(funcs);
            result = [].concat(fields, funcs).join(", ");
        } else {
            result = "*";
        }
        return result;
    }

    build(): string {
        const type: string = this.queryType;
        const table: string = this.getQueryTable();
        const fieldsStr: string = this.formatFieldStr();
        let query: string = `${type} ${fieldsStr} FROM ${table}`;
        query = this.whereBuild(query);
        query = this.groupBuild(query);
        query = this.havingBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        return query;
    }

    fields(arg: any, ...otherArgs: any[]) {
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

    asFieldMap(map: KeyValueStr) {
        const asMap: KeyValueStr = Type.object.safe(this.fieldsAsMap);
        if (!strObjVerify(map)) {
            throw new Error(ErrMsg.errorFieldMap);
        }
        this.fieldsAsMap = Object.assign({}, asMap, map);
        return this;
    }

    limit(offset: number, step?: number) {
        this.getLimitCase().limit(offset, step);
        return this;
    }

    paging(page: number, size: number) {
        this.getLimitCase().paging(page, size);
        return this;
    }

    findOne() {
        this.getLimitCase().step(1);
        return this;
    }
}

export default Select;
