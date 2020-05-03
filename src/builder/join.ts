import { argStrArrTrans } from "../util/util";
import Combine from "./combine";
import { Type } from "schema-verify";
import {
    TableFieldsMap,
    TableFieldsAsMap,
    JoinTableInfo,
    JoinTypeInfo,
    JoinTermInfo,
    KeyValueStr,
} from "../constant/interface";
import { JoinTypes } from "../constant/enum";
import {
    fieldsMapVerify,
    fieldsAsMapVerify,
    joinInfoVerify,
} from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

class Join extends Combine {
    protected queryTables: string[] = [];
    protected tableFieldsMap: TableFieldsMap = {};
    protected tableFieldsAsMap: TableFieldsAsMap = {};
    protected joinTypeInfos: JoinTypeInfo[] = [];
    constructor() {
        super();
    }

    protected getQueryTables(): string {
        return Type.array
            .safe<any>(this.queryTables)
            .map((table: string) => {
                return this.safeKey(table);
            })
            .join(", ");
    }

    protected formatJoinFields(): string[] {
        const tableFieldsMap: TableFieldsMap = Type.object.safe(
            this.tableFieldsMap
        );
        const tableFieldsAsMap: TableFieldsAsMap = Type.object.safe(
            this.tableFieldsAsMap
        );
        const result: string[] = [];

        for (const table of Object.keys(tableFieldsMap)) {
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

    protected joinBuild(query: string) {
        const joinTypeInfos: JoinTypeInfo[] = Type.array.safe(
            this.joinTypeInfos
        );
        if (!Type.array.isNotEmpty(joinTypeInfos)) {
            return query;
        }
        const joinStrs: string[] = [];
        for (const typeInfo of joinTypeInfos) {
            const type: JoinTypes = typeInfo.type;
            const info: JoinTableInfo = Type.object.safe(typeInfo.info);
            const tableName: string = info.tableName;
            const termInfos: JoinTermInfo[] = Type.array.safe(info.termInfos);
            const termStrs: string[] = this.joinTermBuild(termInfos);
            const safeTableName: string = this.safeKey(tableName);
            let joinInfoStr: string = `${type} JOIN ${safeTableName}`;
            if (Type.array.isNotEmpty(termStrs)) {
                const allTermStr = termStrs.join(" AND ");
                joinInfoStr += ` ON ${allTermStr}`;
            }
            joinStrs.push(joinInfoStr);
        }
        if (!Type.array.isNotEmpty(joinStrs)) {
            return query;
        }
        const allJoinStr = joinStrs.join(" ");
        query = `${query} ${allJoinStr}`;
        return query;
    }

    protected joinTermBuild(termInfos: JoinTermInfo[]) {
        const result: string[] = [];
        for (const termInfo of termInfos) {
            const symbol: string = termInfo.symbol;
            const tableFields: KeyValueStr = termInfo.tableFields;
            let termStr: string = "";
            for (const table of Object.keys(tableFields)) {
                const field = tableFields[table];
                const safeTable: string = this.safeKey(table);
                const safeField: string = this.safeKey(field);
                if (Type.string.isNotEmpty(termStr)) {
                    termStr += ` ${symbol} `;
                }
                termStr += `${safeTable}.${safeField}`;
            }
            result.push(`(${termStr})`);
        }
        return result;
    }

    multiTables(arg: any, ...otherArgs: any[]): this {
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

    tableFields(fieldsMap: TableFieldsMap): this {
        const tableFieldsMap: TableFieldsMap = Type.object.safe(
            this.tableFieldsMap
        );
        if (!fieldsMapVerify(fieldsMap)) {
            throw new Error(ErrMsg.tableFieldsError);
        }
        this.tableFieldsMap = Object.assign({}, tableFieldsMap, fieldsMap);
        return this;
    }

    tableAsMap(asMap: TableFieldsAsMap): this {
        const tableFieldsAsMap: TableFieldsAsMap = Type.object.safe(
            this.tableFieldsAsMap
        );
        if (!fieldsAsMapVerify(asMap)) {
            throw new Error(ErrMsg.tableFieldsAsMapError);
        }
        this.tableFieldsAsMap = Object.assign({}, tableFieldsAsMap, asMap);
        return this;
    }

    protected join(joinInfo: JoinTableInfo, type: JoinTypes): this {
        const joinTypeInfos: JoinTypeInfo[] = Type.array.safe(
            this.joinTypeInfos
        );
        if (!joinInfoVerify(joinInfo)) {
            throw new Error(ErrMsg.joinTableInfoError);
        }
        const typeInfo: JoinTypeInfo = {
            type: type,
            info: joinInfo,
        };
        joinTypeInfos.push(typeInfo);
        this.joinTypeInfos = joinTypeInfos;
        return this;
    }

    innerJoin(joinInfo: JoinTableInfo): this {
        this.join(joinInfo, JoinTypes.inner);
        return this;
    }

    leftJoin(joinInfo: JoinTableInfo): this {
        this.join(joinInfo, JoinTypes.left);
        return this;
    }

    rightJoin(joinInfo: JoinTableInfo): this {
        this.join(joinInfo, JoinTypes.right);
        return this;
    }
}

export default Join;
