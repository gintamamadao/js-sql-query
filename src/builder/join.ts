import { argStrArrTrans } from "../util/util";
import Combine from "./combine";
import { Type } from "schema-verify";
import {
    TableFieldsMap,
    TableFieldsAsMap,
    KeyValueStr
} from "../constant/builder/interface";
import { fieldsMapVerify, fieldsAsMapVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

class Join extends Combine {
    protected queryTables: string[];
    protected tableFieldsMap: TableFieldsMap;
    protected tableFieldsAsMap: TableFieldsAsMap;
    constructor() {
        super();
    }

    protected getQueryTables(): string {
        const queryTables: string = Type.array
            .safe(this.queryTables)
            .map(table => {
                return this.safeKey(table);
            })
            .join(", ");
        return queryTables;
    }

    protected formatJoinFields(): string[] {
        const tableFieldsMap: TableFieldsMap = Type.object.safe(
            this.tableFieldsMap
        );
        const tableFieldsAsMap: TableFieldsAsMap = Type.object.safe(
            this.tableFieldsAsMap
        );
        const result: string[] = [];
        for (const table in tableFieldsMap) {
            const fields: string[] = Type.array.safe(tableFieldsMap[table]);
            const asMap: KeyValueStr = Type.object.safe(
                tableFieldsAsMap[table]
            );
            const safeTable: string = this.safeKey(table);
            for (const field of fields) {
                if (!Type.string.isNotEmpty(field)) {
                    continue;
                }
                const safeField: string = this.safeKey(field);
                const tableField: string = `${safeTable}.${safeField}`;
                if (Type.string.isNotEmpty(asMap[field])) {
                    const safeAsField = this.safeKey(asMap[field]);
                    result.push(`${tableField} AS ${safeAsField}`);
                } else {
                    result.push(tableField);
                }
            }
        }
        return result;
    }

    multiTables(arg: any, ...otherArgs: any[]) {
        const queryTables: string[] = Type.array.safe(this.queryTables);
        const args: any[] = argStrArrTrans(arg, otherArgs);
        const tables: string[] = [];
        for (const item of args) {
            if (Type.string.isNotEmpty(item)) {
                tables.push(item);
            }
        }
        this.queryTables = Array.from(new Set(queryTables.concat(tables)));
        return this;
    }

    tableFields(fieldsMap: TableFieldsMap) {
        const tableFieldsMap: TableFieldsMap = Type.object.safe(
            this.tableFieldsMap
        );
        if (!fieldsMapVerify(fieldsMap)) {
            throw new Error(ErrMsg.tableFieldsError);
        }
        this.tableFieldsMap = Object.assign({}, tableFieldsMap, fieldsMap);
        return this;
    }

    tableAsMap(asMap: TableFieldsAsMap) {
        const tableFieldsAsMap: TableFieldsAsMap = Type.object.safe(
            this.tableFieldsAsMap
        );
        if (!fieldsAsMapVerify(asMap)) {
            throw new Error(ErrMsg.tableFieldsAsMapError);
        }
        this.tableFieldsAsMap = Object.assign({}, tableFieldsAsMap, asMap);
        return this;
    }
}

export default Join;
