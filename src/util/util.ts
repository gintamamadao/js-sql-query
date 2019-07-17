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

export function argStrArrTrans(arg: any, otherArgs: any[]): any[] {
    let args: any[] = [];
    if (Type.array.is(arg)) {
        args = arg;
    } else {
        otherArgs = Type.array.safe(otherArgs);
        otherArgs.unshift(arg);
        args = otherArgs;
    }
    return args;
}
