import Dialects from "../util/dialects";
import { DialectTypes } from "../constant/enum";
import { SafeValue, SafeKey, Dialect, SqlParam } from "../constant/interface";
import { Type } from "schema-verify";
import { dialectVerify, manualSqlVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";
import Store from "./store";

class Base {
    protected _queryTable: string = "";
    protected _dialect: Dialect = {} as Dialect;
    protected _dialectType: DialectTypes = "" as DialectTypes;
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

    protected safeValue: SafeValue = function (value) {
        const _dialectType = this._dialectType;
        return this._safeValue(value); + "";
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

  
}

export default Base;
