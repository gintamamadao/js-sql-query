import { DialectTypes } from "../constant/enum";
import { SafeValue, SafeKey, Dialect, SqlParam } from "../constant/interface";
import Execute from "../execute/execute";
declare class Base {
    protected _queryTable: string;
    protected _dialect: Dialect;
    protected _dialectType: DialectTypes;
    protected _execute: Execute;
    dialectType: DialectTypes;
    setDialect(dialectType: DialectTypes): void;
    protected _safeValue: SafeValue;
    protected _safeKey: SafeKey;
    protected loadModule(moduleName: string): void;
    protected safeValue: SafeValue;
    protected safeKey: SafeKey;
    protected manualSql(sql: SqlParam, key: string): void;
    protected formatManualSql(key: string): string;
    protected build(): string;
    readonly query: string;
    table(queryTable: string): this;
    protected getQueryTable(): string;
    storeSql(): this;
    setExecute(execute: Execute): void;
    exec<T = any>(sqlStr?: string): Promise<T>;
    execAll<T = any>(queryList?: string[]): Promise<T[]>;
}
export default Base;
