import { TermSign, TermLogic } from "./enum";
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
    query: string;
}
