import { OrderTypes } from "../constant/enum";
import { OrderInfo, FieldOrder } from "../constant/interface";
import Base from "./base";
declare class Order extends Base {
    protected orderInfos: OrderInfo[];
    protected orderSql: string | Function;
    constructor();
    build(): string;
    orderBuild(query: string): string;
    descBy(firstField: string[] | string, otherFields: string[]): this;
    ascBy(firstField: string[] | string, otherFields: string[]): this;
    orderField(data: FieldOrder): this;
    order(sql: string | Function): void;
    protected formatOrderSql(): string;
    protected orderCache(fields: string[], type: OrderTypes, fieldOrder?: FieldOrder): this;
}
export default Order;
