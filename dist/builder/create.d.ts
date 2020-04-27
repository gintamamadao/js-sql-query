import Base from "./base";
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
declare class Create extends Base {
    protected createTableSqlStr: string;
    protected createDbName: string;
    protected createTableInfo: TableInfo;
    constructor();
    checkDialect(): void;
    info(tableInfo: TableInfo | string): this;
    dataBase(dbName: string): this;
    build(): string;
    protected tableTmpl(info: TableInfo): string;
    protected feildsStr(info: TableInfo): string;
    protected feildTmpl(fieldInfo: TableField): string;
    protected primaryKeyStr(keyInfo: string | combineKey): string;
    protected uniqueKeyStr(keyInfo: string | combineKey): string;
    protected tableOptsStr(info: TableInfo): string;
}
export default Create;
