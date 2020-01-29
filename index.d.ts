import Builder from "./src/builder/builder";

declare enum DialectTypes {
    mysql = "mysql",
    mssql = "mssql",
    postgresql = "postgresql",
    sqlite = "sqlite"
}

declare enum QueryTypes {
    insert = "INSERT",
    replace = "REPLACE",
    select = "SELECT",
    update = "UPDATE",
    delete = "DELETE",
    create = "CREATE",
    alter = "ALTER"
}

declare enum FuncTypes {
    count = "COUNT",
    sum = "SUM",
    max = "MAX",
    min = "MIN",
    avg = "AVG",
    abs = "ABS",
    ceil = "CEIL",
    floor = "FLOOR",
    round = "ROUND",
    log = "LOG",
    log2 = "LOG2",
    exp = "EXP",
    power = "POWER",
    acos = "ACOS",
    asin = "ASIN",
    atan = "ATAN",
    cos = "COS",
    sin = "SIN",
    tan = "TAN",
    conv = "CONV",
    random = "RANDOM",
    rand = "RAND",
    radians = "RADIANS",
    degrees = "DEGREES",
    distinct = "DISTINCT"
}

declare enum TermLogic {
    and = "AND",
    or = "OR"
}

declare enum TermSign {
    equal = "=",
    notEqual = "<>",
    more = ">",
    less = "<",
    moreEqual = ">=",
    lessEqual = "<=",
    like = "LIKE",
    notlike = "NOT LIKE",
    isNot = "IS NOT",
    in = "IN",
    notIn = "NOT IN",
    between = "BETWEEN",
    notBetween = "NOT BETWEEN"
}

declare enum OrderTypes {
    desc = "DESC",
    asc = "ASC",
    field = "FIELD"
}

declare enum UpdateTypes {
    set = "SET",
    add = "ADD",
    minus = "MINUS"
}

declare enum WidgetTypes {
    func = "FUNC",
    term = "TERM",
    order = "ORDER"
}

declare enum SqlDataTypes {
    tinyint = "TINYINT",
    smallint = "SMALLINT",
    mediumint = "MEDIUMINT",
    int = "INT",
    bigint = "BIGINT",
    float = "FLOAT",
    double = "DOUBLE",
    decimal = "DECIMAL",
    date = "DATE",
    time = "TIME",
    year = "YEAR",
    datetime = "DATETIME",
    timestamp = "TIMESTAMP",
    char = "CHAR",
    varchar = "VARCHAR",
    tinyblob = "TINYBLOB",
    tinytest = "TINYTEXT",
    blob = "BLOB",
    test = "TEXT",
    mediumblob = "MEDIUMBLOB",
    mediumtext = "MEDIUMTEXT",
    longblob = "LONGBLOB",
    longtext = "LONGTEXT"
}

declare enum TableOptions {
    primaryKey = "PRIMARY KEY",
    uniqueKey = "UNIQUE KEY",
    engine = "ENGINE",
    autoIncrement = "AUTO_INCREMENT",
    defaultCharset = "DEFAULT CHARSET",
    comment = "COMMENT",
    unsigned = "UNSIGNED",
    notNull = "NOT NULL",
    default = "DEFAULT",
    onUpdate = "ON UPDATE",
    constraint = "CONSTRAINT"
}

declare enum AlterMethods {
    add = "ADD",
    drop = "DROP",
    modify = "MODIFY",
    change = "CHANGE"
}

declare enum JoinTypes {
    inner = "INNER",
    left = "LEFT",
    right = "RIGHT"
}

declare enum TermTypes {
    where = "whereTerm",
    having = "havingTerm"
}

declare enum DialectModules {
    mysql = "mysql",
    mssql = "mssql"
}

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
