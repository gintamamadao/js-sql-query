import Having from "./having";
import Func from "./func";
import * as Util from "../util/util";
import { FuncInfo } from "../constant/interface";
import { DialectTypes } from "../constant/enum";

interface FuncInput {
    func: string;
    field: string | number;
}

class Combine extends Having {
    protected combineFuncs: FuncInfo[];
    protected funcInstance: Func;
    protected groupByFields: string[];
    constructor() {
        super();
        this.combineFuncs = [];
    }

    protected groupBuild(query: string): string {
        const fields: string[] = this.groupByFields;
        if (!Util.isNotEmptyArr(fields)) {
            return query;
        }
        const fieldsStr: string = fields
            .map(field => this.safeKey(field))
            .join(", ");
        query = `${query} GROUP BY ${fieldsStr}`;
        return query;
    }

    groupBy(...fields: string[]) {
        let groupByFields: string[] = Util.safeToArr(this.groupByFields);
        if (!Util.isNotEmptyArr(fields)) {
            throw new Error("Illegal Field");
        }
        groupByFields = groupByFields.concat(fields);
        this.groupByFields = Array.from(new Set(groupByFields));
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

    protected formatFuncs(): string[] {
        const combineFuncs: FuncInfo[] = Util.safeToArr(this.combineFuncs);
        let funcs: string[] = [];
        for (const info of combineFuncs) {
            if (
                !Util.isNotEmptyObj(info) ||
                !Util.isNotEmptyStr(info.funcFeild)
            ) {
                throw new Error("Illegal Func Feild");
            }
            const funcFeild: string = info.funcFeild;
            funcs.push(funcFeild);
        }
        funcs = Array.from(new Set(funcs));
        return funcs;
    }

    protected funcsCache(funcInfo: FuncInfo) {
        const combineFuncs: FuncInfo[] = Util.safeToArr(this.combineFuncs);
        if (
            Util.isNotEmptyObj(funcInfo) &&
            Util.isNotEmptyStr(funcInfo.funcFeild)
        ) {
            combineFuncs.push(funcInfo);
        }
        this.combineFuncs = combineFuncs;
        return this;
    }

    funcFeilds(...funcInfos: FuncInfo[] | FuncInput[]) {
        for (let info of funcInfos) {
            info = Util.safeToObj(info);
            let saveInfo: FuncInfo = <FuncInfo>info;
            const func: string = (<FuncInput>info).func;
            const field: string | number = (<FuncInput>info).field;
            const funcCase = this.getFuncCase();
            if (
                Util.isNotEmptyStr(func) &&
                Util.isFunction(funcCase[func]) &&
                !Util.isUndefinedNull(field)
            ) {
                saveInfo = funcCase[func].call(funcCase, field);
            }
            this.funcsCache(saveInfo);
        }
        return this;
    }

    count(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().count(field);
        return this.funcsCache(funcInfo);
    }

    sum(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().sum(field);
        return this.funcsCache(funcInfo);
    }

    max(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().max(field);
        return this.funcsCache(funcInfo);
    }

    min(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().min(field);
        return this.funcsCache(funcInfo);
    }

    avg(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().avg(field);
        return this.funcsCache(funcInfo);
    }

    abs(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().abs(field);
        return this.funcsCache(funcInfo);
    }

    ceil(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().ceil(field);
        return this.funcsCache(funcInfo);
    }

    floor(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().floor(field);
        return this.funcsCache(funcInfo);
    }

    round(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().round(field);
        return this.funcsCache(funcInfo);
    }

    log(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().log(field);
        return this.funcsCache(funcInfo);
    }

    log2(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().log2(field);
        return this.funcsCache(funcInfo);
    }

    exp(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().exp(field);
        return this.funcsCache(funcInfo);
    }

    power(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().power(field);
        return this.funcsCache(funcInfo);
    }

    acos(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().acos(field);
        return this.funcsCache(funcInfo);
    }

    asin(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().asin(field);
        return this.funcsCache(funcInfo);
    }

    atan(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().atan(field);
        return this.funcsCache(funcInfo);
    }

    cos(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().cos(field);
        return this.funcsCache(funcInfo);
    }

    sin(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().sin(field);
        return this.funcsCache(funcInfo);
    }

    tan(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().tan(field);
        return this.funcsCache(funcInfo);
    }

    conv(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().conv(field);
        return this.funcsCache(funcInfo);
    }

    random(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().random(field);
        return this.funcsCache(funcInfo);
    }

    rand(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().rand(field);
        return this.funcsCache(funcInfo);
    }

    radians(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().radians(field);
        return this.funcsCache(funcInfo);
    }

    degrees(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().degrees(field);
        return this.funcsCache(funcInfo);
    }

    distinct(field?: number | string) {
        const funcInfo: FuncInfo = this.getFuncCase().distinct(field);
        return this.funcsCache(funcInfo);
    }
}

export default Combine;
