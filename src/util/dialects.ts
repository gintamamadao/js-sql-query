import { Dialects } from "../constant/interface";
import { Type } from "schema-verify";

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
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Type.string.isNotEmpty(key)) {
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
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            if (!Type.string.isNotEmpty(key)) {
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
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Type.string.isNotEmpty(key)) {
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
            if (Type.number.is(value)) {
                result = `'${value}'`;
            }
            if (!result) {
                throw new Error("Illegal Value");
            }
            return result;
        },
        safeKey(key: string): string {
            let result: string;
            if (!Type.string.isNotEmpty(key)) {
                throw new Error("Illegal Key");
            }
            result = key.replace(/`/g, "``");
            return "`" + result + "`";
        }
    }
};

export default DialectsObj;
