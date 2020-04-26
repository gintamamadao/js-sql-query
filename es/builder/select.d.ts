import Join from "./join";
import { KeyValueStr } from "../constant/interface";
declare class Select extends Join {
    protected selectFields: string[];
    protected fieldsAsMap: KeyValueStr;
    constructor();
    protected formatFields(): string[];
    protected formatFieldStr(): string;
    protected formatTableStr(): string;
    build(): string;
    fields(arg: any, ...otherArgs: any[]): this;
    asMap(map: KeyValueStr): this;
    limit(offset: number, step?: number): this;
    paging(page: number, size: number): this;
    findOne(): this;
}
export default Select;
