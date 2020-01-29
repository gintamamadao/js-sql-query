import { Type } from "schema-verify";
let QUERY_LIST: string[] = [];

class Store {
    getStore(): string[] {
        return QUERY_LIST.slice();
    }

    storeSql(query: string) {
        if (Type.string.isNotEmpty(query)) {
            QUERY_LIST.push(query);
        }
    }

    isStoreEmpty(): boolean {
        return !(QUERY_LIST.length > 0);
    }

    cleanStoreSql(): void {
        QUERY_LIST = [];
    }
}

export default new Store();
