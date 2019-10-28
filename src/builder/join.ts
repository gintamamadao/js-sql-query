import { argStrArrTrans } from "../util/util";
import Combine from "./combine";
import { Type } from "schema-verify";
import {
    TableFieldsInfo,
    TableFieldsAsMap
} from "../constant/builder/interface";

class Join extends Combine {
    protected queryTables: string[];
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

    tableFields(fieldsInfo: TableFieldsInfo) {}

    tableAsMap(asMap: TableFieldsAsMap) {}
}

export default Join;
