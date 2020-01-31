import Builder from "./src/builder/builder";

declare type DialectTypes = "mysql" | "mssql";

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

export default function SqlQuery(config: ConnectConfig | DialectTypes): Builder;
