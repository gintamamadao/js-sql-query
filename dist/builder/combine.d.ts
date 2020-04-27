import Having from "./having";
import Func from "./func";
import { FuncInfo } from "../constant/interface";
interface FuncInput {
    func: string;
    field: string | number;
}
declare class Combine extends Having {
    protected combineFuncs: FuncInfo[];
    protected funcInstance: Func;
    protected groupByFields: string[];
    constructor();
    protected groupBuild(query: string): string;
    groupBy(...fields: string[]): this;
    protected getFuncCase(): Func;
    protected formatFuncs(): string[];
    protected funcsCache(funcInfo: FuncInfo): this;
    funcFeilds(...funcInfos: FuncInfo[] | FuncInput[]): this;
    count(field?: number | string): this;
    sum(field?: number | string): this;
    max(field?: number | string): this;
    min(field?: number | string): this;
    avg(field?: number | string): this;
    abs(field?: number | string): this;
    ceil(field?: number | string): this;
    floor(field?: number | string): this;
    round(field?: number | string): this;
    log(field?: number | string): this;
    log2(field?: number | string): this;
    exp(field?: number | string): this;
    power(field?: number | string): this;
    acos(field?: number | string): this;
    asin(field?: number | string): this;
    atan(field?: number | string): this;
    cos(field?: number | string): this;
    sin(field?: number | string): this;
    tan(field?: number | string): this;
    conv(field?: number | string): this;
    random(field?: number | string): this;
    rand(field?: number | string): this;
    radians(field?: number | string): this;
    degrees(field?: number | string): this;
    distinct(field?: number | string): this;
}
export default Combine;
