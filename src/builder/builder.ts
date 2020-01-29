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
import { QueryTypes, DialectTypes, WidgetTypes } from "../constant/enum";
import ErrMsg from "../error/builder/index";
import Execute from "../execute/execute";
import { ConnectConfig } from "../constant/interface";
import Store from "./store";

const TABLE_QUERY_TYPE = [
    QueryTypes.insert,
    QueryTypes.replace,
    QueryTypes.select,
    QueryTypes.update,
    QueryTypes.delete
];
class Builder {
    protected dialectType: DialectTypes;
    protected execute: Execute;
    public queryStore: string[];
    protected queryTable: string;
    constructor(dialectType?: DialectTypes, execute?: Execute) {
        this.dialectType = dialectType || DialectTypes.mysql;
        this.execute = execute;
        this.queryStore = [];
    }

    insert(): Insert {
        return this.queryInstance<Insert>(QueryTypes.insert);
    }

    select(): Select {
        return this.queryInstance<Select>(QueryTypes.select);
    }

    update(): Update {
        return this.queryInstance<Update>(QueryTypes.update);
    }

    delete(): Delete {
        return this.queryInstance<Delete>(QueryTypes.delete);
    }

    replace(): Replace {
        return this.queryInstance<Replace>(QueryTypes.replace);
    }

    create(): Create {
        return this.queryInstance<Create>(QueryTypes.create);
    }

    alter(): Alter {
        return this.queryInstance<Alter>(QueryTypes.alter);
    }

    get func(): Func {
        return this.widgetInstance<Func>(WidgetTypes.func);
    }

    get term(): Term {
        return this.widgetInstance<Term>(WidgetTypes.term);
    }

    get order(): Order {
        return this.widgetInstance<Order>(WidgetTypes.order);
    }

    queryInstance<T>(type: QueryTypes): T {
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
        return this.initInstance<T>(type, instance);
    }

    widgetInstance<T>(type: WidgetTypes): T {
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
        return this.initInstance<T>(type, instance);
    }

    protected initInstance<T>(type, instance): T {
        instance = Type.object.safe(instance);
        const dialectType: DialectTypes = this.dialectType;
        const execute: Execute = this.execute;
        const queryTable: string = this.queryTable;
        if (
            Type.string.isNotEmpty(queryTable) &&
            Type.func.is(instance.table)
        ) {
            if (TABLE_QUERY_TYPE.includes(type)) {
                instance.table(queryTable);
            }
        }
        if (Type.func.is(instance.setDialect)) {
            instance.setDialect(dialectType);
        }
        if (Type.func.is(instance.checkDialect)) {
            instance.checkDialect();
        }
        if (Type.func.is(instance.setExecute)) {
            instance.setExecute(execute);
        }
        return instance;
    }

    table(tableName: string): Builder {
        if (!Type.string.isNotEmpty(tableName)) {
            throw new Error(ErrMsg.errorTableName);
        }
        this.queryTable = tableName;
        return this;
    }

    build(): void {
        throw new Error(ErrMsg.emptyQueryType);
    }

    setConnect(config: ConnectConfig) {
        if (Type.object.isNot(config)) {
            return this;
        }
        config = Type.object.safe(config);
        const execute = new Execute(config);
        this.dialectType = config.dialect || DialectTypes.mysql;
        this.execute = execute;
        return this;
    }

    get query(): string | void {
        return this.build();
    }

    getStore(): string[] {
        return Store.getStore();
    }

    storeSql(query: string): void {
        return Store.storeSql(query);
    }

    isStoreEmpty(): boolean {
        return Store.isStoreEmpty();
    }

    cleanStoreSql(): void {
        return Store.cleanStoreSql();
    }
}

export default Builder;
