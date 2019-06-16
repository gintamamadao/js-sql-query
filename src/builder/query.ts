import * as Util from "../util/util";
import { QueryTypes, DialectTypes } from "../constant/enum";
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

    protected _checkQuery(): void {
        const type = this.queryType;
        const table = this.queryTable;
        if (!Util.isNotEmptyStr(type)) {
            throw new Error("Illegal Query Type");
        }
        if (!Util.isNotEmptyStr(table)) {
            throw new Error("Illegal Table Name");
        }
    }

    table(tableName: string) {
        if (!Util.isNotEmptyStr(tableName)) {
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
