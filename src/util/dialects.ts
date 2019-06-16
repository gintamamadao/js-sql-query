import { Dialects } from "../constant/interface";
import * as Util from "./util";

const DialectsObj: Dialects = {
    mysql: {
        safeValue(value: number | string): string {
            let result: string;
            if (typeof value === "string") {
                value = value
                    .replace(/\'/g, () => "''")
                    .replace(/\\/g, () => "\\\\");
                result = `'${value}'`;
            }
            if (Util.isLegalNum(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Util.isNotEmptyStr(key)) {
                throw new Error("Illegal Key");
            }
            result = key.replace(/`/g, "``");
            return "`" + result + "`";
        }
    },
    mssql: {
        safeValue(value: number | string): string {
            let result: string;
            if (typeof value === "string") {
                value = value.replace(/\'/g, () => "''");
                result = `'${value}'`;
            }
            if (Util.isLegalNum(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            if (!Util.isNotEmptyStr(key)) {
                throw new Error("Illegal Key");
            }
            return `[${key}]`;
        }
    },
    postgresql: {
        safeValue(value: number | string): string {
            let result: string;
            if (typeof value === "string") {
                value = value.replace(/\'/g, () => "''");
                result = `'${value}'`;
            }
            if (Util.isLegalNum(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Util.isNotEmptyStr(key)) {
                throw new Error("Illegal Key");
            }
            result = key.replace(/\"/g, '""');
            return `"${result}"`;
        }
    },
    sqlite: {
        safeValue(value: number | string): string {
            let result: string;
            if (typeof value === "string") {
                value = value.replace(/\'/g, () => "''");
                result = `'${value}'`;
            }
            if (Util.isLegalNum(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Util.isNotEmptyStr(key)) {
                throw new Error("Illegal Key");
            }
            result = key.replace(/`/g, "``");
            return "`" + result + "`";
        }
    }
};

export default DialectsObj;
