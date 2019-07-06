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
    delete = "DELETE"
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
    noEqual = "<>",
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

export enum DataTypes {
    tinyint = "TINYINT",
    smallint = "SMALLINT",
    mediumint = "MEDIUMINT",
    int = "INT",
    bigint = "BIGINT",
    float = "FLOAT",
    double = "DOUBLE",
    decimal = "DECIMAL"
}
