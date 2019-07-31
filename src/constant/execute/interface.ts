import { DialectTypes } from "../builder/enum";
export interface ConnectConfig {
    host: string;
    port?: string | number;
    user: string;
    password?: string;
    database: string;
    connectionLimit?: number;
    dialect?: DialectTypes;
}
export interface DbConnect {
    query: Function;
    release: Function;
}
