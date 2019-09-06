import { Type } from "schema-verify";
import { ConnectConfig } from "../../constant/execute/interface";
import { DialectModules } from "../../constant/execute/enum";
import ErrMsg from "../../error/execute/index";
import BaseConnect from "./base_connect";

class MysqlConnect extends BaseConnect {
    constructor(config: ConnectConfig) {
        super(config);
        this.pool = this.getPool();
    }

    getPool() {
        let pool = this.pool;
        const dbConfig = this.dbConfig;
        if (Type.object.is(pool) && Type.function.is(pool.getConnection)) {
            return pool;
        }
        const msyqlModule = this.loadModule(DialectModules.mysql);
        pool = msyqlModule.createPool(dbConfig);
        return pool;
    }

    getDbConnect() {
        const pool = this.getPool() || {};
        if (Type.function.isNot(pool.getConnection)) {
            throw new Error(ErrMsg.emptyConnectPool);
        }
        return new Promise((relsove, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                if (
                    !connection ||
                    Type.function.isNot(connection.query) ||
                    Type.function.isNot(connection.release)
                ) {
                    reject(new Error(ErrMsg.errorConnect));
                }
                relsove(connection);
            });
        });
    }
}

export default MysqlConnect;
