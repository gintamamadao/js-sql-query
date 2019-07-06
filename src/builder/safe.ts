import * as Util from "../util/util";
import Dialects from "../util/dialects";
import { DialectTypes } from "../constant/enum";
import { SafeValue, SafeKey, Dialect } from "../constant/interface";

class Safe {
    protected _dialect: Dialect;
    protected _dialectType: DialectTypes;

    get dialectType(): DialectTypes {
        const dialectType: DialectTypes = this._dialectType;
        if (!Dialects[dialectType]) {
            throw new Error("Illegal Dialect Type");
        }
        return dialectType;
    }

    set dialectType(dialectType: DialectTypes) {
        const dialect = Dialects[dialectType];
        if (
            !dialect ||
            !(typeof dialect.safeKey === "function") ||
            !(typeof dialect.safeValue === "function")
        ) {
            throw new Error("Illegal Dialect Type");
        }
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
        if (!Util.isNotEmptyStr(sql) && !Util.isFunction(sql) && !(sql instanceof Safe)) {
            throw new Error("Illegal Sql Type, Need String or Function");
        }
        this[key] = sql;
    }

    protected formatManualSql(key: string): string {
        let sql: any = this[key];
        if (Util.isNotEmptyStr(sql)) {
            return <string>sql;
        }
        if (Util.isFunction(sql)) {
            sql = (<Function>sql)();
            if (Util.isNotEmptyStr(sql)) {
                return <string>sql;
            }
        }
        if (Util.isNotEmptyObj(sql) && sql instanceof Safe) {
            sql = sql.query;
            if (Util.isNotEmptyStr(sql)) {
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
}

export default Safe;
