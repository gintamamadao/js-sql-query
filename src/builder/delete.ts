import { QueryTypes } from "../constant/builder/enum";
import Where from "./where";

class Delete extends Where {
    build(): string {
        const table: string = this.getQueryTable();
        let query: string = `${QueryTypes.delete} FROM ${table}`;
        query = this.whereBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        return query;
    }
}

export default Delete;
