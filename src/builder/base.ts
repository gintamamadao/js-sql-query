import Dialects from "../util/dialects";
import { DialectTypes, DialectModules } from "../constant/enum";
import { SafeValue, SafeKey, Dialect, SqlParam } from "../constant/interface";
import { Type } from "schema-verify";
import { dialectVerify, manualSqlVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";
import Execute from "../execute/execute";
import Store from "./store";

class Base {
    protected _queryTable: string = "";
    protected _dialect: Dialect = {} as Dialect;
    protected _dialectType: DialectTypes = "" as DialectTypes;
    protected _execute: Execute = {} as Execute;

    get dialectType(): DialectTypes {
        const dialectType: DialectTypes = this._dialectType;
        if (!dialectVerify(Dialects[dialectType])) {
            throw new Error(ErrMsg.errorDialect);
        }
        return dialectType;
    }

    set dialectType(dialectType: DialectTypes) {
        this.setDialect(dialectType);
    }

    setDialect(dialectType: DialectTypes): void {
        if (!dialectVerify(Dialects[dialectType])) {
            throw new Error(ErrMsg.errorDialect);
        }
        const dialect = Dialects[dialectType];
        this._dialect = dialect;
        this._dialectType = dialectType;
        this._safeValue = dialect.safeValue;
        this._safeKey = dialect.safeKey;
    }

    protected _safeValue: SafeValue = (): string => {
        return "";
    };

    protected _safeKey: SafeKey = (): string => {
        return "";
    };

    protected loadModule(moduleName: string): void {
        try {
            return require(moduleName);
        } catch (err) {
            if (err && err.code === "MODULE_NOT_FOUND") {
                throw new Error(`请先安装模块 ${moduleName}`);
            }
            throw err;
        }
    }

    protected safeValue: SafeValue = function (value) {
        const _dialectType = this._dialectType;
        let dbModule;
        switch (_dialectType) {
            case DialectTypes.mysql:
                dbModule = this.loadModule(DialectModules.mysql);
                value = dbModule.escape(value);
                break;
            default:
                value = this._safeValue(value);
                break;
        }
        return value + "";
    };

    protected safeKey: SafeKey = function (key: string): string {
        return this._safeKey(key);
    };

    protected manualSql(sql: SqlParam, key: string): void {
        if (!manualSqlVerify(sql) && !(sql instanceof Base)) {
            throw new Error(ErrMsg.errorManualSql);
        }
        (<any>this)[key] = sql;
    }

    protected formatManualSql(key: string): string {
        let sql: any = (<any>this)[key];
        if (Type.string.is(sql)) {
            return sql;
        }
        if (Type.func.is<any>(sql)) {
            sql = sql();
            if (Type.string.is(sql)) {
                return sql;
            }
        }
        if (Type.object.isNotEmpty(sql) && sql instanceof Base) {
            sql = sql.query;
            if (Type.string.is(sql)) {
                return sql;
            }
        }
        return "";
    }

    protected build(): string {
        return "";
    }

    get query(): string {
        return this.build();
    }

    table(queryTable: string): this {
        if (!Type.string.isNotEmpty(queryTable)) {
            throw new Error(ErrMsg.errorTableName);
        }
        this._queryTable = queryTable;
        return this;
    }

    protected getQueryTable(): string {
        const queryTable = this._queryTable;
        if (!Type.string.isNotEmpty(queryTable)) {
            throw new Error(ErrMsg.errorTableName);
        }
        return this.safeKey(queryTable);
    }

    storeSql(): this {
        let sqlStr;
        try {
            sqlStr = this.build();
        } catch (e) {}
        if (Type.string.isNotEmpty(sqlStr)) {
            Store.storeSql(sqlStr);
        }
        return this;
    }

    setExecute(execute: Execute): void {
        this._execute = execute;
    }

    exec<T = any>(sqlStr?: string): Promise<T> {
        const execute: Execute = this._execute;
        const query = Type.string.isNotEmpty(sqlStr) ? sqlStr : this.build();
        if (!Type.string.isNotEmpty(query)) {
            throw new Error(ErrMsg.emptySqlQuery);
        }
        if (Type.object.isNot(execute) || Type.func.isNot(execute.exec)) {
            throw new Error(ErrMsg.errorExecute);
        }
        return execute.exec(query || "");
    }

    execAll<T = any>(queryList?: string[]): Promise<T[][]> {
        queryList = queryList || [];
        const execute: Execute = this._execute;
        queryList = Type.array.isNotEmpty(queryList)
            ? queryList
            : Store.getStore();
        if (Type.object.isNot(execute) || Type.func.isNot(execute.exec)) {
            throw new Error(ErrMsg.errorExecute);
        }
        const promiseArr: Promise<T[]>[] = [];
        for (let query of queryList) {
            if (!Type.string.isNotEmpty(query)) {
                continue;
            }
            promiseArr.push(execute.exec(query));
        }
        return Promise.all(promiseArr);
    }
}

export default Base;
