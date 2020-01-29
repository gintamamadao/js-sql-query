import { FieldOrder } from "../constant/interface";
import Base from "./base";
import Limit from "./limit";
import Order from "./order";

class Query extends Base {
    protected queryLimit: Limit;
    protected queryOrder: Order;

    protected getLimitCase(): Limit {
        let queryLimit: Limit = this.queryLimit;
        if (!queryLimit || !(queryLimit instanceof Limit)) {
            queryLimit = new Limit();
            this.queryLimit = queryLimit;
        }
        return queryLimit;
    }

    protected limitBuild(query: string): string {
        return this.getLimitCase().limitBuild(query);
    }

    offset(offset: number): this {
        this.getLimitCase().offset(offset);
        return this;
    }

    step(step: number): this {
        this.getLimitCase().step(step);
        return this;
    }

    protected getOrderCase(): Order {
        let queryOrder: Order = this.queryOrder;
        if (!queryOrder || !(queryOrder instanceof Order)) {
            queryOrder = new Order();
            queryOrder.setDialect(this.dialectType);
            this.queryOrder = queryOrder;
        }
        return queryOrder;
    }

    protected orderBuild(query: string): string {
        return this.getOrderCase().orderBuild(query);
    }

    descBy(firstField: string[] | string, ...otherFields: string[]): this {
        this.getOrderCase().descBy(firstField, otherFields);
        return this;
    }

    ascBy(firstField: string[] | string, ...otherFields: string[]): this {
        this.getOrderCase().ascBy(firstField, otherFields);
        return this;
    }

    orderField(data: FieldOrder): this {
        this.getOrderCase().orderField(data);
        return this;
    }

    order(sql: string | Function): this {
        this.getOrderCase().order(sql);
        return this;
    }
}

export default Query;
