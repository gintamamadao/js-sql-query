import MysqlConnect from "./connect/mysql_connect";
import MyssqlConnect from "./connect/mssql_connect";
import { ConnectConfig } from "../constant/interface";
import { DialectTypes } from "../constant/enum";
import { Type } from "schema-verify";
import ErrMsg from "../error/execute/index";

class Execute {
    dialectType: DialectTypes;
    connect: any;
    constructor(config: ConnectConfig) {
        this.dialectType = config.dialect || DialectTypes.mysql;
        this.connect = this.getConnect(config);
    }
    getConnect(config: ConnectConfig): MysqlConnect | MyssqlConnect {
        const dialect = this.dialectType;
        let connect;
        switch (dialect) {
            case DialectTypes.mysql:
                connect = new MysqlConnect(config);
                break;
            case DialectTypes.mssql:
                connect = new MyssqlConnect(config);
                break;
        }
        if (Type.undefinedNull.is(connect)) {
            throw new Error(ErrMsg.errorDialectType);
        }
        return connect;
    }
    async exec<T = any>(query: string): Promise<T> {
        const connect = this.connect || {};
        if (Type.func.isNot(connect.getDbConnect)) {
            throw new Error(ErrMsg.emptyConnectPool);
        }
        const dbConnection = await connect.getDbConnect();
        return new Promise<T>((relsove, reject) => {
            dbConnection.query(query, function(err: Error, results: T) {
                dbConnection.release();
                if (err) {
                    reject(err);
                }
                relsove(results);
            });
        });
    }
}

export default Execute;
