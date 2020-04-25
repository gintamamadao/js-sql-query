import { Type } from "schema-verify";
import { ConnectConfig, DbConnect } from "../../constant/interface";
import { DialectModules } from "../../constant/enum";
import BaseConnect from "./base_connect";

class MyssqlConnect extends BaseConnect {
    constructor(config: ConnectConfig) {
        super(config);
        this.pool = this.getPool();
    }

    getPool(): any {
        let pool = this.pool;
        const dbConfig = this.dbConfig;
        if (Type.object.is(pool) && Type.func.is(pool.acquire)) {
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
                max: dbConfig.connectionLimit || 1,
            },
        };
        const MssqlModule = this.loadModule(DialectModules.mssql);
        pool = new MssqlModule.ConnectionPool(config).connect();
        return pool;
    }

    getDbConnect(): Promise<DbConnect> {
        let pool = this.getPool() || {};
        return new Promise<DbConnect>(async (relsove, reject) => {
            pool = await pool;
            this.pool = pool;
            const request = pool.request();
            const conn = {
                query: function (query: any, cb: Function) {
                    request.query(query, (err: Error, result: any) => {
                        if (err) {
                            reject(err);
                        }
                        cb(err, result);
                    });
                },
                release: () => {},
            };
            relsove(conn);
        });
    }
}

export default MyssqlConnect;
