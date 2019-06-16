import Having from "./having";
import Func from "./func";
import * as Util from "../util/util";
import { DialectTypes } from "../constant/enum";

class Combine extends Having {
    protected combineFuncs: string[];
    protected funcInstance: Func;
    protected groupByField: string;
    constructor() {
        super();
        this.combineFuncs = [];
    }

    protected groupBuild(query: string): string {
        const field: string = this.groupByField;
        if (!Util.isNotEmptyStr(field)) {
            return query;
        }
        query = `${query} GROUP BY ${field}`;
        return query;
    }

    groupBy(field: string) {
        if (!Util.isNotEmptyStr(field)) {
            throw new Error("Illegal Field");
        }
        this.groupByField = field;
        return this;
    }

    protected getFuncCase() {
        let func: Func = this.funcInstance;
        const dialectType: DialectTypes = this.dialectType;
        if (!func || !(func instanceof Func)) {
            func = new Func(dialectType);
            this.funcInstance = func;
        }
        return func;
    }

    protected funcs(funcField: string) {
        let combineFuncs: string[] = Util.safeToArr(this.combineFuncs);
        if (Util.isNotEmptyStr(funcField)) {
            combineFuncs.push(funcField);
        }
        combineFuncs = Array.from(new Set(combineFuncs));
        this.combineFuncs = combineFuncs;
        return this;
    }

    count(field?: number | string) {
        const funcField: string = this.getFuncCase().count(field);
        return this.funcs(funcField);
    }

    sum(field?: number | string) {
        const funcField: string = this.getFuncCase().sum(field);
        return this.funcs(funcField);
    }

    max(field?: number | string) {
        const funcField: string = this.getFuncCase().max(field);
        return this.funcs(funcField);
    }

    min(field?: number | string) {
        const funcField: string = this.getFuncCase().min(field);
        return this.funcs(funcField);
    }

    avg(field?: number | string) {
        const funcField: string = this.getFuncCase().avg(field);
        return this.funcs(funcField);
    }

    abs(field?: number | string) {
        const funcField: string = this.getFuncCase().abs(field);
        return this.funcs(funcField);
    }

    ceil(field?: number | string) {
        const funcField: string = this.getFuncCase().ceil(field);
        return this.funcs(funcField);
    }

    floor(field?: number | string) {
        const funcField: string = this.getFuncCase().floor(field);
        return this.funcs(funcField);
    }

    round(field?: number | string) {
        const funcField: string = this.getFuncCase().round(field);
        return this.funcs(funcField);
    }

    log(field?: number | string) {
        const funcField: string = this.getFuncCase().log(field);
        return this.funcs(funcField);
    }

    log2(field?: number | string) {
        const funcField: string = this.getFuncCase().log2(field);
        return this.funcs(funcField);
    }

    exp(field?: number | string) {
        const funcField: string = this.getFuncCase().exp(field);
        return this.funcs(funcField);
    }

    power(field?: number | string) {
        const funcField: string = this.getFuncCase().power(field);
        return this.funcs(funcField);
    }

    acos(field?: number | string) {
        const funcField: string = this.getFuncCase().acos(field);
        return this.funcs(funcField);
    }

    asin(field?: number | string) {
        const funcField: string = this.getFuncCase().asin(field);
        return this.funcs(funcField);
    }

    atan(field?: number | string) {
        const funcField: string = this.getFuncCase().atan(field);
        return this.funcs(funcField);
    }

    cos(field?: number | string) {
        const funcField: string = this.getFuncCase().cos(field);
        return this.funcs(funcField);
    }

    sin(field?: number | string) {
        const funcField: string = this.getFuncCase().sin(field);
        return this.funcs(funcField);
    }

    tan(field?: number | string) {
        const funcField: string = this.getFuncCase().tan(field);
        return this.funcs(funcField);
    }

    conv(field?: number | string) {
        const funcField: string = this.getFuncCase().conv(field);
        return this.funcs(funcField);
    }

    random(field?: number | string) {
        const funcField: string = this.getFuncCase().random(field);
        return this.funcs(funcField);
    }

    rand(field?: number | string) {
        const funcField: string = this.getFuncCase().rand(field);
        return this.funcs(funcField);
    }

    radians(field?: number | string) {
        const funcField: string = this.getFuncCase().radians(field);
        return this.funcs(funcField);
    }

    degrees(field?: number | string) {
        const funcField: string = this.getFuncCase().degrees(field);
        return this.funcs(funcField);
    }

    distinct(field?: number | string) {
        const funcField: string = this.getFuncCase().distinct(field);
        return this.funcs(funcField);
    }
}

export default Combine;
