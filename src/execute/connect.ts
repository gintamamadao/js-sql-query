import mysql from "mysql";
import { Type } from "schema-verify";
import { conConfigVerify } from "../verify/execute/index";
import { ConnectConfig } from "../constant/execute/interface";
import { DialectTypes } from "../constant/builder/enum";
import ErrMsg from "../error/execute/index";

const DB = {
    host: "localhost",
    user: "root",
    password: "root@1234",
    port: 3306,
    database: "static"
};
class Connect {
    dbConfig: ConnectConfig;
    dialect: DialectTypes;
    pool: number;
    idleConnects: [];
    busyConnects: [];
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
        const pool: number = config.pool;
        const dbConfig = {
            host,
            user,
            password,
            port,
            database
        };
        this.dbConfig = Type.object.pure(dbConfig);
        this.dialect = dialect;
        this.pool = pool;
        this.idleConnects = [];
        this.busyConnects = [];
    }

    getDbConnect() {
        const dbConfig = this.dbConfig;
        const idleConnects = Type.array.safe(this.idleConnects);
        const busyConnects = Type.array.safe(this.busyConnects);

        let dbConnection;
        if (idleConnects.length > 0) {
            dbConnection = idleConnects.unshift();
        } else {
            if (!conConfigVerify(dbConfig)) {
                throw new Error(ErrMsg.errorConnectConfig);
            }
            dbConnection = mysql.createConnection(dbConfig);
        }
        busyConnects.push(dbConnection);
        this.idleConnects = idleConnects;
        this.busyConnects = busyConnects;
        return dbConnection;
    }
}

export default Connect;
