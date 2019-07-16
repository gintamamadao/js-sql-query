import { TermSign, TermLogic, OrderTypes } from "./enum";
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
export interface OrderInfo {
    field: string;
    type: OrderTypes;
    list?: string[];
}
export interface FieldOrder {
    [propName: string]: string[];
}
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
