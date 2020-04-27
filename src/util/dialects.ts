import { Dialects } from "../constant/interface";
import { Type } from "schema-verify";
import ErrMsg from "../error/builder/index";

const DialectsObj: Dialects = {
    mysql: {
        safeValue(value: number | string): string {
            let result: string = "";
            if (typeof value === "string") {
                value = value
                    .replace(/\'/g, () => "''")
                    .replace(/\\/g, () => "\\\\");
                result = `'${value}'`;
            }
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error(ErrMsg.needNumStr);
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Type.string.isNotEmpty(key)) {
                throw new Error(ErrMsg.needStr);
            }
            result = key.replace(/`/g, "``");
            return "`" + result + "`";
        },
    },
    mssql: {
        safeValue(value: number | string): string {
            let result: string = "";
            if (typeof value === "string") {
                value = value.replace(/\'/g, () => "''");
                result = `'${value}'`;
            }
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error(ErrMsg.needNumStr);
            }
            return result;
        },
        safeKey(key: string): string {
            if (!Type.string.isNotEmpty(key)) {
                throw new Error(ErrMsg.needStr);
            }
            return `[${key}]`;
        },
    },
    postgresql: {
        safeValue(value: number | string): string {
            let result: string = "";
            if (typeof value === "string") {
                value = value.replace(/\'/g, () => "''");
                result = `'${value}'`;
            }
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error(ErrMsg.needNumStr);
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Type.string.isNotEmpty(key)) {
                throw new Error(ErrMsg.needStr);
            }
            result = key.replace(/\"/g, '""');
            return `"${result}"`;
        },
    },
    sqlite: {
        safeValue(value: number | string): string {
            let result: string = "";
            if (typeof value === "string") {
                value = value.replace(/\'/g, () => "''");
                result = `'${value}'`;
            }
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error(ErrMsg.needNumStr);
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Type.string.isNotEmpty(key)) {
                throw new Error(ErrMsg.needStr);
            }
            result = key.replace(/`/g, "``");
            return "`" + result + "`";
        },
    },
};

export default DialectsObj;
