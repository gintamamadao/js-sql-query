import Builder from "./src/builder/builder";

declare type DialectTypes = "mysql" | "mssql" | "postgresql" | "sqlite";

declare type QueryTypes =
    | "INSERT"
    | "REPLACE"
    | "SELECT"
    | "UPDATE"
    | "DELETE"
    | "CREATE"
    | "ALTER";

declare type FuncTypes =
    | "COUNT"
    | "SUM"
    | "MAX"
    | "MIN"
    | "AVG"
    | "ABS"
    | "CEIL"
    | "FLOOR"
    | "ROUND"
    | "LOG"
    | "LOG2"
    | "EXP"
    | "POWER"
    | "ACOS"
    | "ASIN"
    | "ATAN"
    | "COS"
    | "SIN"
    | "TAN"
    | "CONV"
    | "RANDOM"
    | "RAND"
    | "RADIANS"
    | "DEGREES"
    | "DISTINCT";

declare type TermLogic = "AND" | "OR";

declare type TermSign =
    | "="
    | "<>"
    | ">"
    | "<"
    | ">="
    | "<="
    | "LIKE"
    | "NOT LIKE"
    | "IS NOT"
    | "IN"
    | "NOT IN"
    | "BETWEEN"
    | "NOT BETWEEN";

declare type OrderTypes = "DESC" | "ASC" | "FIELD";

declare type UpdateTypes = "SET" | "ADD" | "MINUS";

declare type WidgetTypes = "FUNC" | "TERM" | "ORDER";

declare type SqlDataTypes =
    | "TINYINT"
    | "SMALLINT"
    | "MEDIUMINT"
    | "INT"
    | "BIGINT"
    | "FLOAT"
    | "DOUBLE"
    | "DECIMAL"
    | "DATE"
    | "TIME"
    | "YEAR"
    | "DATETIME"
    | "TIMESTAMP"
    | "CHAR"
    | "VARCHAR"
    | "TINYBLOB"
    | "TINYTEXT"
    | "BLOB"
    | "TEXT"
    | "MEDIUMBLOB"
    | "MEDIUMTEXT"
    | "LONGBLOB"
    | "LONGTEXT";

declare type TableOptions =
    | "PRIMARY KEY"
    | "UNIQUE KEY"
    | "ENGINE"
    | "AUTO_INCREMENT"
    | "DEFAULT CHARSET"
    | "COMMENT"
    | "UNSIGNED"
    | "NOT NULL"
    | "DEFAULT"
    | "ON UPDATE"
    | "CONSTRAINT";

declare type AlterMethods = "ADD" | "DROP" | "MODIFY" | "CHANGE";

declare type JoinTypes = "INNER" | "LEFT" | "RIGHT";

declare type TermTypes = "whereTerm" | "havingTerm";

declare type DialectModules = "mysql" | "mssql";

declare interface KeyValueStr {
    [propName: string]: string;
}
declare interface SafeValue {
    (value: number | string): string;
}
declare interface SafeKey {
    (key: string): string;
}
declare interface Dialect {
    safeValue: SafeValue;
    safeKey: SafeKey;
}
declare interface Dialects {
    [propName: string]: Dialect;
}
declare interface TermData {
    [propName: string]: string | number | string[];
}
declare interface TermInfo {
    field: string;
    value: string | number | string[];
    sign: TermSign;
    logic: TermLogic;
}
declare interface TermBracket {
    position: number;
    logic: TermLogic;
}
declare interface FieldData {
    [propName: string]: string | number;
}
declare interface FuncInfo {
    funcFeild: string;
}
declare interface OrderInfo {
    field: string;
    type: OrderTypes;
    list?: string[];
}
declare interface FieldOrder {
    [propName: string]: string[];
}

declare interface TableFieldsMap {
    [propName: string]: string[];
}

declare interface TableFieldsAsMap {
    [propName: string]: KeyValueStr;
}

declare interface JoinTermInfo {
    symbol: string;
    tableFields: {
        tableName: string;
    };
}

declare interface JoinTableInfo {
    tableName: string;
    termInfos: JoinTermInfo[];
}

declare interface JoinTypeInfo {
    type: JoinTypes;
    info: JoinTableInfo;
}

declare interface ConnectConfig {
    host: string;
    port?: string | number;
    user: string;
    password?: string;
    database: string;
    connectTimeout?: number;
    connectionLimit?: number;
    dialect?: DialectTypes;
}
declare interface DbConnect {
    query: Function;
    release: Function;
}

declare type SqlParam = string | Function | Object;

export default function SqlQuery(config: ConnectConfig | DialectTypes): Builder;
