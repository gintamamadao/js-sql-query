import * as Util from "../util/util";
import { OrderTypes, DialectTypes } from "../constant/enum";
import Safe from "./safe";

interface OrderFieldInfo {
    fields: string[];
    type: OrderTypes;
}

class Order extends Safe {
    protected orderFieldInfos: OrderFieldInfo[];
    constructor(dialectType: DialectTypes) {
        super();
        this.dialectType = dialectType;
        this.orderFieldInfos = [];
    }

    orderBuild(query: string): string {
        const fieldInfos: OrderFieldInfo[] = Util.safeToArr(
            this.orderFieldInfos
        );
        if (!Util.isNotEmptyArr(fieldInfos)) {
            return query;
        }
        const fieldStrArr: string[] = [];
        for (const info of fieldInfos) {
            const fields: string[] = Util.safeToArr(info.fields);
            const type: OrderTypes = info.type;
            for (const field of fields) {
                const safeField = this.safeKey(field);
                fieldStrArr.push(`${safeField} ${type}`);
            }
        }
        if (!Util.isNotEmptyArr(fieldStrArr)) {
            return query;
        }
        const orderInfoStr = fieldStrArr.join(", ");
        return `${query} ORDER BY ${orderInfoStr}`;
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

    protected orderCache(fields: string[], type: OrderTypes) {
        const orderFieldInfos: OrderFieldInfo[] = Util.safeToArr(
            this.orderFieldInfos
        );
        const fieldInfo: OrderFieldInfo = {
            fields,
            type
        };
        orderFieldInfos.push(fieldInfo);
        this.orderFieldInfos = orderFieldInfos;
    }
}

export default Order;
