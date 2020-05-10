import { DialectTypes } from "./enum";
import { TermSign, TermLogic, OrderTypes, JoinTypes } from "./enum";

export interface KeyValueStr {
    [propName: string]: string;
}
export interface SafeValue {
    (value: number | string): string;
}
export interface SafeKey {
    (key: string): string;
}
export interface Dialect {
    safeValue: SafeValue;
    safeKey: SafeKey;
}
export interface Dialects {
    [propName: string]: Dialect;
}
export interface TermData {
    [propName: string]: string | number | string[];
}
export interface TermInfo {
    field: string;
    value: string | number | string[];
    sign: TermSign;
    logic: TermLogic;
}
export interface TermBracket {
    position: number;
    logic: TermLogic;
}
export interface FieldData {
    [propName: string]: string | number;
}
export interface FuncInfo {
    funcFeild: string;
}
export interface FuncInput {
    func: string;
    field: string | number;
}
export interface OrderInfo {
    field: string;
    type: OrderTypes;
    list?: string[];
}
export interface FieldOrder {
    [propName: string]: string[];
}

export interface TableFieldsMap {
    [propName: string]: string[];
}

export interface TableFieldsAsMap {
    [propName: string]: KeyValueStr;
}

export interface JoinTermInfo {
    symbol: string;
    tableFields: {
        tableName: string;
    };
}

export interface JoinTableInfo {
    tableName: string;
    termInfos: JoinTermInfo[];
}

export interface JoinTypeInfo {
    type: JoinTypes;
    info: JoinTableInfo;
}

export interface ConnectConfig {
    host: string;
    port?: string | number;
    user: string;
    password?: string;
    database: string;
    connectTimeout?: number;
    connectionLimit?: number;
    dialect?: DialectTypes;
}
export interface DbConnect {
    query: Function;
    release: Function;
}

export type SqlParam = string | Function | Object;
