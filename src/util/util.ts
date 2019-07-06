import { Type } from "schema-verify";

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
