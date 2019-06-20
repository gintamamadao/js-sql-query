import Insert from "./insert";
import Select from "./select";
import Update from "./update";
import Delete from "./delete";
import Replace from "./replace";
import Term from "./term";
import Func from "./func";
import Order from "./order";
import * as Util from "../util/util";
import { QueryTypes, DialectTypes, WidgetTypes } from "../constant/enum";

class Builder {
    protected dialectType: DialectTypes;
    public queryStore: string[];
    protected queryTable: string;
    constructor(dialectType?: DialectTypes) {
        this.dialectType = dialectType || DialectTypes.mysql;
        this.queryStore = [];
    }

    insert() {
        return this.queryInstance(QueryTypes.insert);
    }

    select() {
        return this.queryInstance(QueryTypes.select);
    }

    update() {
        return this.queryInstance(QueryTypes.update);
    }

    delete() {
        return this.queryInstance(QueryTypes.delete);
    }

    replace() {
        return this.queryInstance(QueryTypes.replace);
    }

    get func() {
        return this.widgetInstance(WidgetTypes.func);
    }

    get term() {
        return this.widgetInstance(WidgetTypes.term);
    }

    get order() {
        return this.widgetInstance(WidgetTypes.order);
    }

    queryInstance(type: QueryTypes) {
        const dialectType: DialectTypes = this.dialectType;
        const queryTable: string = this.queryTable;
        let instance: any = {};
        switch (type) {
            case QueryTypes.insert:
                instance = new Insert(dialectType);
                break;
            case QueryTypes.replace:
                instance = new Replace(dialectType);
                break;
            case QueryTypes.select:
                instance = new Select(dialectType);
                break;
            case QueryTypes.update:
                instance = new Update(dialectType);
                break;
            case QueryTypes.delete:
                instance = new Delete(dialectType);
                break;
        }
        if (Util.isNotEmptyStr(queryTable)) {
            typeof instance.table === "function" && instance.table(queryTable);
        }
        return instance;
    }

    widgetInstance(type: WidgetTypes) {
        const dialectType: DialectTypes = this.dialectType;
        let instance: any = {};
        switch (type) {
            case WidgetTypes.func:
                instance = new Func(dialectType);
                break;
            case WidgetTypes.term:
                instance = new Term(dialectType);
                break;
            case WidgetTypes.order:
                instance = new Order(dialectType);
                break;
        }
        return instance;
    }

    table(tableName: string) {
        if (!Util.isNotEmptyStr(tableName)) {
            throw new Error("Illegal Table Name");
        }
        this.queryTable = tableName;
        return this;
    }
}

export default Builder;
