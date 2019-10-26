import { Type } from "schema-verify";
import { ConnectConfig } from "../../constant/execute/interface";
import { DialectModules } from "../../constant/execute/enum";
import ErrMsg from "../../error/execute/index";
import BaseConnect from "./base_connect";

class MyssqlConnect extends BaseConnect {
    mssqlRequest;
    constructor(config: ConnectConfig) {
        super(config);
        this.pool = this.getPool();
        this.mssqlRequest = this.loadModule(DialectModules.mssql).Request;
    }

    getPool() {
        let pool = this.pool;
        const dbConfig = this.dbConfig;
        if (Type.object.is(pool) && Type.function.is(pool.acquire)) {
            return pool;
        }
        const poolConfig = {
            min: 1,
            max: dbConfig.connectionLimit || 0
        };
        const connectionConfig = {
            userName: dbConfig.user,
            password: dbConfig.password,
            server: dbConfig.host,
            options: {
                port: dbConfig.port,
                database: dbConfig.database
            }
        };
        const MssqlPoolModule = this.loadModule(DialectModules.mssqlPool);
        pool = new MssqlPoolModule(poolConfig, connectionConfig);
        return pool;
    }

    getDbConnect() {
        const pool = this.getPool() || {};
        const mssqlRequest = this.mssqlRequest;
        if (Type.function.isNot(pool.acquire)) {
            throw new Error(ErrMsg.emptyConnectPool);
        }
        return new Promise((relsove, reject) => {
            pool.acquire((err, connection) => {
                if (err) {
                    reject(err);
                }
                if (
                    !connection ||
                    Type.function.isNot(connection.execSql) ||
                    Type.function.isNot(connection.release)
                ) {
                    reject(new Error(ErrMsg.errorConnect));
                }
                const conn = {
                    query: function(query, fn) {
                        const request = new mssqlRequest(query, function(
                            err,
                            rowCount
                        ) {
                            if (err) {
                                fn(err);
                                return;
                            }
                            fn(null, rowCount);
                        });
                        request.on("row", function(columns) {
                            fn(null, columns);
                        });
                        connection.execSql(request);
                    },
                    release: function() {
                        connection.release();
                    }
                };
                relsove(conn);
            });
        });
    }
}

export default MyssqlConnect;
