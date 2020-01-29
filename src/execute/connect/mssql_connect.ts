import { Type } from "schema-verify";
import { ConnectConfig } from "../../constant/interface";
import { DialectModules } from "../../constant/enum";
import ErrMsg from "../../error/execute/index";
import BaseConnect from "./base_connect";

class MyssqlConnect extends BaseConnect {
    constructor(config: ConnectConfig) {
        super(config);
        this.pool = this.getPool();
    }

    getPool() {
        let pool = this.pool;
        const dbConfig = this.dbConfig;
        if (Type.object.is<any>(pool) && Type.func.is(pool.acquire)) {
            return pool;
        }
        const config = {
            server: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            connectionTimeout: dbConfig.connectTimeout,
            pool: {
                min: 1,
                max: dbConfig.connectionLimit || 1
            }
        };
        const MssqlModule = this.loadModule(DialectModules.mssql);
        pool = new MssqlModule.ConnectionPool(config).connect();
        return pool;
    }

    getDbConnect() {
        let pool = this.getPool() || {};
        return new Promise(async (relsove, reject) => {
            pool = await pool;
            this.pool = pool;
            const request = pool.request();
            const conn = {
                query: function(query, cb) {
                    request.query(query, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        cb(err, result);
                    });
                },
                release: () => {}
            };
            relsove(conn);
        });
    }
}

export default MyssqlConnect;
