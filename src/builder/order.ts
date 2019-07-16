import { argStrArrTrans } from "../util/util";
import { OrderTypes } from "../constant/enum";
import { OrderInfo, FieldOrder } from "../constant/interface";
import { Type } from "schema-verify";
import Safe from "./safe";
import {
    orderInfoVerify,
    valueListVerify,
    strArrVerify
} from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

const SQL_NAME = "orderSql";

class Order extends Safe {
    protected orderInfos: OrderInfo[];
    protected orderSql: string | Function;
    constructor() {
        super();
        this.orderInfos = [];
    }

    build(): string {
        const orderSql: string = this.formatOrderSql();
        if (Type.string.isNotEmpty(orderSql)) {
            return orderSql;
        }
        const orderInfos: OrderInfo[] = Type.array.safe(this.orderInfos);
        if (!Type.array.isNotEmpty(orderInfos)) {
            return "";
        }
        let ordersArr: string[] = [];
        for (const info of orderInfos) {
            if (!orderInfoVerify(info)) {
                continue;
            }
            const field: string = info.field;
            const type: OrderTypes = info.type;
            const list: string[] = info.list;
            const safeField = this.safeKey(field);
            if (type === OrderTypes.field) {
                const listStr: string = list
                    .map(value => this.safeValue(value))
                    .join(", ");
                ordersArr.push(`${type}(${safeField}, ${listStr})`);
                continue;
            }
            ordersArr.push(`${safeField} ${type}`);
        }
        if (!Type.array.isNotEmpty(ordersArr)) {
            return "";
        }
        ordersArr = Array.from(new Set(ordersArr));
        const ordersStr = ordersArr.join(", ");
        return ordersStr;
    }

    orderBuild(query: string): string {
        const ordersStr: string = this.build();
        if (Type.string.isNotEmpty(ordersStr)) {
            query = `${query} ORDER BY ${ordersStr}`;
        }
        return query;
    }

    descBy(firstField: string[] | string, otherFields: string[]) {
        const argFields: string[] = argStrArrTrans(firstField, otherFields);
        return this.orderCache(argFields, OrderTypes.desc);
    }

    ascBy(firstField: string[] | string, otherFields: string[]) {
        const argFields: string[] = argStrArrTrans(firstField, otherFields);
        return this.orderCache(argFields, OrderTypes.asc);
    }

    orderField(data: FieldOrder) {
        data = Type.object.safe(data);
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
        if (!strArrVerify(fields)) {
            throw new Error(ErrMsg.errorFields);
        }
        fieldOrder = Type.object.safe(fieldOrder);
        const orderInfos: OrderInfo[] = Type.array.safe(this.orderInfos);
        for (const field of fields) {
            const info: OrderInfo = {
                field,
                type
            };
            if (type === OrderTypes.field) {
                const list: string[] = fieldOrder[field];
                if (!valueListVerify(list)) {
                    throw new Error(ErrMsg.errorValueList);
                }
                info["list"] = list;
            }
            if (!orderInfoVerify(info)) {
                throw new Error(ErrMsg.errorOrderInfo);
            }
            orderInfos.push(info);
        }
        this.orderInfos = orderInfos;
        return this;
    }
}

export default Order;
