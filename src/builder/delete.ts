import { QueryTypes, DialectTypes } from "../constant/enum";
import Where from "./where";

class Delete extends Where {
    readonly queryType: QueryTypes = QueryTypes.delete;
    constructor(dialectType: DialectTypes) {
        super();
        this.dialectType = dialectType;
    }

    build(): string {
        this.checkQuery();
        const type: string = this.queryType;
        const table: string = this.getQueryTable();
        let query: string = `${type} FROM ${table}`;
        query = this.whereBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        return query;
    }

    checkQuery(): void {
        this._checkQuery();
    }
}

export default Delete;
