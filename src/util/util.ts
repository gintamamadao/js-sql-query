import { KeyValueStr } from "../constant/interface";

export function isNotEmptyStr(s: any): boolean {
    return typeof s === "string" && s.length > 0;
}

export function isNotEmptyObj(o: any): boolean {
    return (
        o &&
        Object.prototype.toString.apply(o) === "[object Object]" &&
        Object.keys(o).length > 0
    );
}

export function isNotEmptyArr(a: any): boolean {
    return Array.isArray(a) && a.length > 0;
}

export function isString(s: any): boolean {
    return typeof s === "string";
}

export function isArray(a: any): boolean {
    return Array.isArray(a);
}

export function isFunction(f: any): boolean {
    return typeof f === "function";
}

export function isLegalNum(n: any): boolean {
    return typeof n === "number" && !isNaN(n);
}

export function isUndefinedNull(n: any): boolean {
    return n === undefined || n === null;
}

export function safeToArr<T>(arr: Array<T>): Array<T> {
    return Array.isArray(arr) ? arr : <Array<T>>[];
}

export function safeToObj<T>(o: T): T {
    return Object.prototype.toString.apply(o) === "[object Object]" ? o : <T>{};
}

export function argStrArrTrans(
    str: string[] | string,
    otherStr: string[]
): string[] {
    let args: string[] = [];
    if (isArray(str)) {
        args = <string[]>str;
    }
    if (isString(str)) {
        otherStr = safeToArr(otherStr);
        otherStr.unshift(<string>str);
        args = otherStr;
    }
    return args;
}

export function replaceTemplate(str: string, opt: KeyValueStr): string {
    if (!isNotEmptyStr(str)) {
        return "";
    }
    return str.replace(/{{([a-zA-Z_0-9]+)}}/g, (match, key) => {
        if (opt[key] || isNotEmptyStr(opt[key])) {
            return opt[key];
        } else {
            return match;
        }
    });
}

export function applyMixins(derivedCtor: any, baseCtors: any[]): void {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
