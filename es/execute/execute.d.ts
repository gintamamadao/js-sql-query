import MysqlConnect from "./connect/mysql_connect";
import MyssqlConnect from "./connect/mssql_connect";
import { ConnectConfig } from "../constant/interface";
import { DialectTypes } from "../constant/enum";
declare class Execute {
    dialectType: DialectTypes;
    connect: any;
    constructor(config: ConnectConfig);
    getConnect(config: ConnectConfig): MysqlConnect | MyssqlConnect;
    exec<T = any>(query: string): Promise<T>;
}
export default Execute;
