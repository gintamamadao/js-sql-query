import { FuncTypes } from "../constant/builder/enum";
import { FuncInfo } from "../constant/builder/interface";
import { Type } from "schema-verify";
import Base from "./base";

class Func extends Base {
    constructor() {
        super();
    }

    protected funcField(func: FuncTypes, field: number | string): FuncInfo {
        const needSafeTrans: boolean =
            Type.string.isNotEmpty(field) && field !== "*";
        const fieldStr: string = needSafeTrans
            ? <string>field
            : Type.number.is(field)
            ? field + ""
            : "*";
        const safeField: string = needSafeTrans
            ? this.safeKey(fieldStr)
            : fieldStr;
        const funcInfo: FuncInfo = {
            funcFeild: `${func}(${safeField})`
        };
        return funcInfo;
    }

    count(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.count, field);
    }

    sum(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.sum, field);
    }

    max(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.max, field);
    }

    min(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.min, field);
    }

    avg(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.avg, field);
    }

    abs(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.abs, field);
    }

    ceil(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.ceil, field);
    }

    floor(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.floor, field);
    }

    round(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.round, field);
    }

    log(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.log, field);
    }

    log2(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.log2, field);
    }

    exp(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.exp, field);
    }

    power(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.power, field);
    }

    acos(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.acos, field);
    }

    asin(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.asin, field);
    }

    atan(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.atan, field);
    }

    cos(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.cos, field);
    }

    sin(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.sin, field);
    }

    tan(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.tan, field);
    }

    conv(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.conv, field);
    }

    random(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.random, field);
    }

    rand(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.rand, field);
    }

    radians(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.radians, field);
    }

    degrees(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.degrees, field);
    }

    distinct(field?: number | string): FuncInfo {
        return this.funcField(FuncTypes.distinct, field);
    }
}

export default Func;
