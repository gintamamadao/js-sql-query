import * as Util from "../util/util";
import { OrderTypes, DialectTypes } from "../constant/enum";
import { OrderInfo, FieldOrder } from "../constant/interface";
import Safe from "./safe";

const SQL_NAME = "orderSql";

class Order extends Safe {
    protected orderInfos: OrderInfo[];
    protected orderSql: string | Function;
    constructor(dialectType: DialectTypes) {
        super();
        this.dialectType = dialectType;
        this.orderInfos = [];
    }

    build(): string {
        const orderSql: string = this.formatOrderSql();
        if (Util.isNotEmptyStr(orderSql)) {
            return orderSql;
        }
        const orderInfos: OrderInfo[] = Util.safeToArr(this.orderInfos);
        if (!Util.isNotEmptyArr(orderInfos)) {
            return "";
        }
        let ordersArr: string[] = [];
        for (const info of orderInfos) {
            const field: string = info.field;
            const type: OrderTypes = info.type;
            const list: string[] = info.list;
            const safeField = this.safeKey(field);
            if (type === OrderTypes.field) {
                if (!Util.isNotEmptyArr(list)) {
                    throw new Error("Illegal Value List");
                }
                const listStr: string = list
                    .map(value => this.safeValue(value))
                    .join(", ");
                ordersArr.push(`${type}(${safeField}, ${listStr})`);
                continue;
            }
            ordersArr.push(`${safeField} ${type}`);
        }
        if (!Util.isNotEmptyArr(ordersArr)) {
            return "";
        }
        ordersArr = Array.from(new Set(ordersArr));
        const ordersStr = ordersArr.join(", ");
        return ordersStr;
    }

    orderBuild(query: string): string {
        const ordersStr: string = this.build();
        if (Util.isNotEmptyStr(ordersStr)) {
            query = `${query} ORDER BY ${ordersStr}`;
        }
        return query;
    }

    descBy(firstField: string[] | string, otherFields: string[]) {
        const argFields: string[] = Util.argStrArrTrans(
            firstField,
            otherFields
        );
        return this.orderCache(argFields, OrderTypes.desc);
    }

    ascBy(firstField: string[] | string, otherFields: string[]) {
        const argFields: string[] = Util.argStrArrTrans(
            firstField,
            otherFields
        );
        return this.orderCache(argFields, OrderTypes.asc);
    }

    orderField(data: FieldOrder) {
        data = Util.safeToObj(data);
        const fields: string[] = Object.keys(data);
        return this.orderCache(fields, OrderTypes.field, data);
    }

    order(sql: string | Function) {
        this.manualSql(sql, SQL_NAME);
    }

    protected formatOrderSql(): string {
        return this.formatManualSql(SQL_NAME);
    }

    protected orderCache(
        fields: string[],
        type: OrderTypes,
        fieldOrder?: FieldOrder
    ) {
        fields = Util.safeToArr(fields);
        fieldOrder = Util.safeToObj(fieldOrder);
        const orderInfos: OrderInfo[] = Util.safeToArr(this.orderInfos);
        for (const field of fields) {
            const info: OrderInfo = {
                field,
                type
            };
            if (type === OrderTypes.field) {
                const list: string[] = fieldOrder[field];
                if (!Util.isNotEmptyArr(list)) {
                    throw new Error("Illegal Value List");
                }
                info["list"] = list;
            }
            orderInfos.push(info);
        }
        this.orderInfos = orderInfos;
        return this;
    }
}

export default Order;
