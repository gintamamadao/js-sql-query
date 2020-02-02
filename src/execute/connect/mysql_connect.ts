import { Type } from "schema-verify";
import { ConnectConfig, DbConnect } from "../../constant/interface";
import { DialectModules } from "../../constant/enum";
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
        if (Type.object.is<any>(pool) && Type.func.is(pool.getConnection)) {
            return pool;
        }
        const MysqlModule = this.loadModule(DialectModules.mysql);
        pool = MysqlModule.createPool(dbConfig);
        return pool;
    }

    getDbConnect(): Promise<DbConnect> {
        const pool = this.getPool() || {};
        if (Type.func.isNot(pool.getConnection)) {
            throw new Error(ErrMsg.emptyConnectPool);
        }
        return new Promise<DbConnect>((relsove, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                if (
                    !connection ||
                    Type.func.isNot(connection.query) ||
                    Type.func.isNot(connection.release)
                ) {
                    reject(new Error(ErrMsg.errorConnect));
                }
                relsove(connection);
            });
        });
    }
}

export default MysqlConnect;
