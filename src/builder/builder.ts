import Insert from "./insert";
import Select from "./select";
import Update from "./update";
import Delete from "./delete";
import Replace from "./replace";
import Create from "./create";
import Alter from "./alter";
import Term from "./term";
import Func from "./func";
import Order from "./order";
import { Type } from "schema-verify";
import { QueryTypes, DialectTypes, WidgetTypes } from "../constant/builder/enum";
import ErrMsg from "../error/builder/index";

const TABLE_QUERY_TYPE = [
    QueryTypes.insert,
    QueryTypes.replace,
    QueryTypes.select,
    QueryTypes.update,
    QueryTypes.delete
];
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

    create() {
        return this.queryInstance(QueryTypes.create);
    }

    alter() {
        return this.queryInstance(QueryTypes.alter);
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
        let instance;
        switch (type) {
            case QueryTypes.insert:
                instance = new Insert();
                break;
            case QueryTypes.replace:
                instance = new Replace();
                break;
            case QueryTypes.select:
                instance = new Select();
                break;
            case QueryTypes.update:
                instance = new Update();
                break;
            case QueryTypes.delete:
                instance = new Delete();
                break;
            case QueryTypes.create:
                instance = new Create();
                break;
            case QueryTypes.alter:
                instance = new Alter();
                break;
        }
        return this.initInstance(type, instance);
    }

    widgetInstance(type: WidgetTypes) {
        let instance;
        switch (type) {
            case WidgetTypes.func:
                instance = new Func();
                break;
            case WidgetTypes.term:
                instance = new Term();
                break;
            case WidgetTypes.order:
                instance = new Order();
                break;
        }
        return this.initInstance(type, instance);
    }

    protected initInstance(type, instance) {
        instance = Type.object.safe(instance);
        const dialectType: DialectTypes = this.dialectType;
        const queryTable: string = this.queryTable;
        if (
            Type.string.isNotEmpty(queryTable) &&
            Type.function.is(instance.table)
        ) {
            if (TABLE_QUERY_TYPE.includes(type)) {
                instance.table(queryTable);
            }
        }
        if (Type.function.is(instance.setDialect)) {
            instance.setDialect(dialectType);
        }
        return instance;
    }

    table(tableName: string) {
        if (!Type.string.isNotEmpty(tableName)) {
            throw new Error(ErrMsg.errorTableName);
        }
        this.queryTable = tableName;
        return this;
    }

    build(): string {
        throw new Error(ErrMsg.emptyQueryType);
    }

    get query(): string {
        return this.build();
    }
}

export default Builder;
