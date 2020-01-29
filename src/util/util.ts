import { Type } from "schema-verify";

export function analyTmpl(tmpl: string, opts: object): string {
    return tmpl
        .replace(/\{\{([a-zA-Z_0-9]+)\}\}/g, function(match, key) {
            if (opts.hasOwnProperty(key) && Type.string.isNotEmpty(opts[key])) {
                return opts[key] + " ";
            } else {
                return "";
            }
        })
        .trim();
}

export function argStrArrTrans<T>(arg: T | T[], otherArgs: T[]): T[] {
    let args: T[] = [];
    if (Type.array.is(arg)) {
        args = <T[]>arg;
    } else {
        otherArgs = Type.array.safe(otherArgs);
        otherArgs.unshift(<T>arg);
        args = otherArgs;
    }
    return args;
}
