import Having from "./having";
import Func from "./func";
import { Type } from "schema-verify";
import { FuncInfo, FuncInput } from "../constant/interface";
import ErrMsg from "../error/builder/index";
import {
    strArrVerify,
    funcInfoVerify,
    funcInputVerify,
} from "../verify/builder/index";

class Combine extends Having {
    protected combineFuncs: FuncInfo[];
    protected funcInstance: Func = {} as Func;
    protected groupByFields: string[] = [];
    constructor() {
        super();
        this.combineFuncs = [];
    }

    protected groupBuild(query: string): string {
        const fields: string[] = this.groupByFields;
        if (!Type.array.isNotEmpty(fields)) {
            return query;
        }
        const fieldsStr: string = fields
            .map((field) => this.safeKey(field))
            .join(", ");
        query = `${query} GROUP BY ${fieldsStr}`;
        return query;
    }

    groupBy(...fields: string[]): this {
        let groupByFields: string[] = Type.array.safe(this.groupByFields);
        if (!strArrVerify(fields)) {
            throw new Error(ErrMsg.errorFields);
        }
        groupByFields = groupByFields.concat(fields);
        this.groupByFields = Array.from(new Set(groupByFields));
        return this;
    }

    protected getFuncCase(): Func {
        let func: Func = this.funcInstance;
        if (!func || !(func instanceof Func)) {
            func = new Func();
            func.setDialect(this.dialectType);
            this.funcInstance = func;
        }
        return func;
    }

    protected formatFuncs(): string[] {
        const combineFuncs: FuncInfo[] = Type.array.safe(this.combineFuncs);
        let funcs: string[] = [];
        for (const info of combineFuncs) {
            if (!funcInfoVerify(info)) {
                throw new Error(ErrMsg.errorFuncInfo);
            }
            const funcFeild: string = info.funcFeild;
            funcs.push(funcFeild);
        }
        funcs = Array.from(new Set(funcs));
        return funcs;
    }

    protected funcsCache(funcInfo: FuncInfo): this {
        const combineFuncs: FuncInfo[] = Type.array.safe(this.combineFuncs);
        if (funcInfoVerify(funcInfo)) {
            combineFuncs.push(funcInfo);
        }
        this.combineFuncs = combineFuncs;
        return this;
    }

    funcFeilds(...funcInfos: FuncInfo[] | FuncInput[]): this {
        for (let info of funcInfos) {
            info = Type.object.safe(info);
            if (funcInfoVerify(info)) {
                this.funcsCache(<FuncInfo>info);
                continue;
            }
            const funcCase = this.getFuncCase();
            if (funcInputVerify(info)) {
                const func: string = (<FuncInput>info).func;
                const field: string | number = (<FuncInput>info).field;
                if (
                    Type.object.is(funcCase) &&
                    Type.func.is((<any>funcCase)[func])
                ) {
                    const funcInfo: FuncInfo = (<any>funcCase)[func].call(
                        funcCase,
                        field
                    );
                    this.funcsCache(funcInfo);
                }
                continue;
            }
        }
        return this;
    }

    count(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().count(field);
        return this.funcsCache(funcInfo);
    }

    sum(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().sum(field);
        return this.funcsCache(funcInfo);
    }

    max(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().max(field);
        return this.funcsCache(funcInfo);
    }

    min(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().min(field);
        return this.funcsCache(funcInfo);
    }

    avg(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().avg(field);
        return this.funcsCache(funcInfo);
    }

    abs(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().abs(field);
        return this.funcsCache(funcInfo);
    }

    ceil(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().ceil(field);
        return this.funcsCache(funcInfo);
    }

    floor(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().floor(field);
        return this.funcsCache(funcInfo);
    }

    round(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().round(field);
        return this.funcsCache(funcInfo);
    }

    log(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().log(field);
        return this.funcsCache(funcInfo);
    }

    log2(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().log2(field);
        return this.funcsCache(funcInfo);
    }

    exp(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().exp(field);
        return this.funcsCache(funcInfo);
    }

    power(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().power(field);
        return this.funcsCache(funcInfo);
    }

    acos(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().acos(field);
        return this.funcsCache(funcInfo);
    }

    asin(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().asin(field);
        return this.funcsCache(funcInfo);
    }

    atan(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().atan(field);
        return this.funcsCache(funcInfo);
    }

    cos(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().cos(field);
        return this.funcsCache(funcInfo);
    }

    sin(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().sin(field);
        return this.funcsCache(funcInfo);
    }

    tan(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().tan(field);
        return this.funcsCache(funcInfo);
    }

    conv(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().conv(field);
        return this.funcsCache(funcInfo);
    }

    random(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().random(field);
        return this.funcsCache(funcInfo);
    }

    rand(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().rand(field);
        return this.funcsCache(funcInfo);
    }

    radians(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().radians(field);
        return this.funcsCache(funcInfo);
    }

    degrees(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().degrees(field);
        return this.funcsCache(funcInfo);
    }

    distinct(field?: number | string): this {
        const funcInfo: FuncInfo = this.getFuncCase().distinct(field);
        return this.funcsCache(funcInfo);
    }
}

export default Combine;
