const mysql = require("mysql");
import { Type } from "schema-verify";
import { conConfigVerify } from "../verify/execute/index";
import { ConnectConfig } from "../constant/execute/interface";
import { DialectTypes } from "../constant/builder/enum";
import ErrMsg from "../error/execute/index";

class Connect {
    dbConfig: ConnectConfig;
    dialectType: DialectTypes;
    pool;
    constructor(config: ConnectConfig) {
        this.setConfig(config);
    }

    setConfig(config: ConnectConfig) {
        if (!conConfigVerify(config)) {
            throw new Error(ErrMsg.errorConnectConfig);
        }
        const host: string = config.host;
        const user: string = config.user;
        const password: string = config.password;
        const port: string | number = config.port;
        const database: string = config.database;
        const dialect: DialectTypes = config.dialect;
        let connectionLimit: number = config.connectionLimit;
        connectionLimit = Type.number.isNatural(connectionLimit)
            ? connectionLimit
            : 1;
        let dbConfig = {
            host,
            user,
            password,
            port,
            database,
            connectionLimit
        };
        dbConfig = Type.object.pure(dbConfig);
        this.pool = mysql.createPool(dbConfig);
        this.dialectType = dialect;
    }

    async getDbConnect() {
        const pool = this.pool || {};
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

export default Connect;
