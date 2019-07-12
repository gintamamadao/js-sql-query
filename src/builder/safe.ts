import Dialects from "../util/dialects";
import { DialectTypes } from "../constant/enum";
import { SafeValue, SafeKey, Dialect } from "../constant/interface";
import { Type } from "schema-verify";
import { dialectVerify } from "../verify/safe.verify";
import ErrMsg from "../error/safe.error";

class Safe {
    protected _dialect: Dialect;
    protected _dialectType: DialectTypes;

    get dialectType(): DialectTypes {
        const dialectType: DialectTypes = this._dialectType;
        if (!dialectVerify(Dialects[dialectType])) {
            throw new Error(ErrMsg.errorDialect);
        }
        return dialectType;
    }

    set dialectType(dialectType: DialectTypes) {
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
        if (
            !Type.string.isNotEmpty(sql) &&
            !Type.function.is(sql) &&
            !(sql instanceof Safe)
        ) {
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
        if (Type.object.isNotEmpty(sql) && sql instanceof Safe) {
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
}

export default Safe;
