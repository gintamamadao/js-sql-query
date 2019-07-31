import Dialects from "../util/dialects";
import { DialectTypes } from "../constant/builder/enum";
import { SafeValue, SafeKey, Dialect } from "../constant/builder/interface";
import { Type } from "schema-verify";
import { dialectVerify, manualSqlVerify } from "../verify/builder/index";
import ErrMsg from "../error/builder/index";
import Execute from "../execute/execute";

class Base {
    protected _queryTable: string;
    protected _dialect: Dialect;
    protected _dialectType: DialectTypes;
    protected _execute: Execute;

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

    setDialect(dialectType: DialectTypes) {
        if (!dialectVerify(Dialects[dialectType])) {
            throw new Error(ErrMsg.errorDialect);
        }
        const dialect = Dialects[dialectType];
        this._dialect = dialect;
        this._dialectType = dialectType;
        this.safeValue = dialect.safeValue;
        this.safeKey = dialect.safeKey;
    }

    protected safeValue: SafeValue = function() {
        return "";
    };

    protected safeKey: SafeKey = function() {
        return "";
    };

    protected manualSql(sql: string | Function, key: string) {
        if (!manualSqlVerify(sql) && !(sql instanceof Base)) {
            throw new Error(ErrMsg.errorManualSql);
        }
        this[key] = sql;
    }

    protected formatManualSql(key: string): string {
        let sql: any = this[key];
        if (Type.string.isNotEmpty(sql)) {
            return <string>sql;
        }
        if (Type.function.is(sql)) {
            sql = (<Function>sql)();
            if (Type.string.isNotEmpty(sql)) {
                return <string>sql;
            }
        }
        if (Type.object.isNotEmpty(sql) && sql instanceof Base) {
            sql = sql.query;
            if (Type.string.isNotEmpty(sql)) {
                return <string>sql;
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

    table(queryTable: string) {
        if (!Type.string.isNotEmpty(queryTable)) {
            throw new Error(ErrMsg.errorTableName);
        }
        this._queryTable = queryTable;
        return this;
    }

    protected getQueryTable() {
        const queryTable = this._queryTable;
        if (!Type.string.isNotEmpty(queryTable)) {
            throw new Error(ErrMsg.errorTableName);
        }
        return this.safeKey(queryTable);
    }

    setExecute(execute: Execute) {
        this._execute = execute;
    }

    run() {
        const execute: Execute = this._execute;
        const query = this.build();
        if (!Type.string.isNotEmpty(query)) {
            throw new Error(ErrMsg.emptySqlQuery);
        }
        if (Type.object.isNot(execute) || Type.function.isNot(execute.run)) {
            throw new Error(ErrMsg.errorExecute);
        }
        return execute.run(query);
    }
}

export default Base;
