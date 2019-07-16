import { QueryTypes } from "../constant/enum";
import Where from "./where";

class Delete extends Where {
    readonly queryType: QueryTypes = QueryTypes.delete;
    constructor() {
        super();
    }

    build(): string {
        const type: string = this.queryType;
        const table: string = this.getQueryTable();
        let query: string = `${type} FROM ${table}`;
        query = this.whereBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        return query;
    }
}

export default Delete;
