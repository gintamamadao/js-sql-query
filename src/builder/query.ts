import { FieldOrder } from "../constant/builder/interface";
import Safe from "./safe";
import Limit from "./limit";
import Order from "./order";

class Query extends Safe {
    protected queryLimit: Limit;
    protected queryOrder: Order;

    protected getLimitCase() {
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

    offset(offset: number) {
        this.getLimitCase().offset(offset);
        return this;
    }

    step(step: number) {
        this.getLimitCase().step(step);
        return this;
    }

    protected getOrderCase() {
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

    descBy(firstField: string[] | string, ...otherFields: string[]) {
        this.getOrderCase().descBy(firstField, otherFields);
        return this;
    }

    ascBy(firstField: string[] | string, ...otherFields: string[]) {
        this.getOrderCase().ascBy(firstField, otherFields);
        return this;
    }

    orderField(data: FieldOrder) {
        this.getOrderCase().orderField(data);
        return this;
    }

    order(sql: string | Function) {
        this.getOrderCase().order(sql);
        return this;
    }
}

export default Query;
