import MysqlConnect from "./connect/mysql_connect";
import { ConnectConfig, DbConnect } from "../constant/execute/interface";
import { DialectTypes } from "../constant/builder/enum";
import { Type } from "schema-verify";
import ErrMsg from "../error/execute/index";

class Execute {
    dialectType: DialectTypes;
    connect;
    constructor(config: ConnectConfig) {
        this.dialectType = config.dialect;
        this.connect = this.getConnect(config);
    }
    getConnect(config: ConnectConfig) {
        const dialect = config.dialect;
        let connect;
        switch (dialect) {
            case DialectTypes.mysql:
                connect = new MysqlConnect(config);
                break;
        }
        return connect;
    }
    async run(query: string) {
        const connect = this.connect || {};
        if (Type.function.isNot(connect.getDbConnect)) {
            throw new Error(ErrMsg.emptyConnectPool);
        }
        const dbConnection = await connect.getDbConnect();
        return new Promise((relsove, reject) => {
            (<DbConnect>dbConnection).query(query, function(err, results) {
                (<DbConnect>dbConnection).release();
                if (err) {
                    reject(err);
                }
                relsove(results);
            });
        });
    }
}

export default Execute;
