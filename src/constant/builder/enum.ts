export enum DialectTypes {
    mysql = "mysql",
    mssql = "mssql",
    postgresql = "postgresql",
    sqlite = "sqlite"
}

export enum QueryTypes {
    insert = "INSERT",
    replace = "REPLACE",
    select = "SELECT",
    update = "UPDATE",
    delete = "DELETE",
    create = "CREATE",
    alter = "ALTER"
}

export enum FuncTypes {
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

export enum TermLogic {
    and = "AND",
    or = "OR"
}

export enum TermSign {
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

export enum OrderTypes {
    desc = "DESC",
    asc = "ASC",
    field = "FIELD"
}

export enum UpdateTypes {
    set = "SET",
    add = "ADD",
    minus = "MINUS"
}

export enum WidgetTypes {
    func = "FUNC",
    term = "TERM",
    order = "ORDER"
}

export enum SqlDataTypes {
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

export enum TableOptions {
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

export enum AlterMethods {
    add = "ADD",
    drop = "DROP",
    modify = "MODIFY",
    change = "CHANGE"
}

export enum JoinTypes {
    inner = "INNER",
    left = "LEFT",
    right = "RIGHT"
}
