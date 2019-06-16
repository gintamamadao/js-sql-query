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
        if (!Util.isNotEmptyStr(sql) && !Util.isFunction(sql)) {
            throw new Error(`Illegal ${key} Sql`);
        }
        this[key] = sql;
    }

    protected formatManualSql(key: string): string {
        let sql: string | Function = this[key];
        if (Util.isNotEmptyStr(sql)) {
            return <string>sql;
        }
        if (Util.isFunction(sql)) {
            const sqlRes: any = (<Function>sql)() || {};
            const query: string | void = sqlRes.query;
            if (Util.isNotEmptyStr(query)) {
                return <string>query;
            }

            if (Util.isNotEmptyStr(sqlRes)) {
                return <string>sqlRes;
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
