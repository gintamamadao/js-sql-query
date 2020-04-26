import Query from "./query";
import { QueryTypes } from "../constant/enum";
import { FieldData } from "../constant/interface";
declare class Insert extends Query {
    protected insertData: FieldData;
    protected insertFields: string[];
    protected insertDataArr: FieldData[];
    protected queryType: QueryTypes;
    protected valuesSql: string | Function;
    constructor();
    data(data: FieldData): this;
    fields(arg: any, ...otherArgs: any[]): this;
    multiData(dataArr: FieldData[]): this;
    values(sql: string | Function): this;
    protected formatValuesSql(): string;
    protected formatFields(): string[];
    protected formatValues(fields: string[]): string;
    build(): string;
}
export default Insert;
