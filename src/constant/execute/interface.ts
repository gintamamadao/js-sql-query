import { DialectTypes } from "../builder/enum";
export interface ConnectConfig {
    host: string;
    port?: string | number;
    user: string;
    password?: string;
    database: string;
    dialect?: DialectTypes;
    pool?: number;
}
