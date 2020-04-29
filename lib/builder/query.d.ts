import { FieldOrder } from "../constant/interface";
import Base from "./base";
import Limit from "./limit";
import Order from "./order";
declare class Query extends Base {
    protected queryLimit: Limit;
    protected queryOrder: Order;
    protected getLimitCase(): Limit;
    protected limitBuild(query: string): string;
    offset(offset: number): this;
    step(step: number): this;
    protected getOrderCase(): Order;
    protected orderBuild(query: string): string;
    descBy(firstField: string[] | string, ...otherFields: string[]): this;
    ascBy(firstField: string[] | string, ...otherFields: string[]): this;
    orderField(data: FieldOrder): this;
    order(sql: string | Function): this;
}
export default Query;
