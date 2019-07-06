import { QueryTypes, DialectTypes } from "../constant/enum";
import { FieldOrder } from "../constant/interface";
import { Type } from "schema-verify";
import Safe from "./safe";
import Limit from "./limit";
import Order from "./order";

class Query extends Safe {
    protected queryTable: string;
    protected queryType: QueryTypes;
    protected queryLimit: Limit;
    protected queryOrder: Order;
    constructor() {
        super();
        this.queryTable = "";
    }

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
            const type: DialectTypes = this.dialectType;
            queryOrder = new Order(type);
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

    protected _checkQuery(): void {
        const type = this.queryType;
        const table = this.queryTable;
        if (!Type.string.isNotEmpty(type)) {
            throw new Error("Illegal Query Type");
        }
        if (!Type.string.isNotEmpty(table)) {
            throw new Error("Illegal Table Name");
        }
    }

    table(tableName: string) {
        if (!Type.string.isNotEmpty(tableName)) {
            throw new Error("Illegal Table Name");
        }
        this.queryTable = tableName;
        return this;
    }

    protected getQueryTable() {
        return this.safeKey(this.queryTable);
    }
}

export default Query;
