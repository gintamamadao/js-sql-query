import Safe from "./safe";
import { QueryTypes, TableOptions } from "../constant/enum";
import { TableInfo } from "../constant/interface";
import { Type } from "schema-verify";
import { tableInfoVerify } from "../verify/builder/index";

class Create extends Safe {
    protected createSqlStr: string;
    protected createInfo: TableInfo;
    constructor() {
        super();
    }

    info(tableInfo: TableInfo | string) {
        if (Type.string.isNotEmpty(tableInfo)) {
            this.createSqlStr = <string>tableInfo;
        }
        if (tableInfoVerify(tableInfo, true)) {
            this.createInfo = <TableInfo>tableInfo;
        }
        return this;
    }

    build(): string {
        let query: string = ``;
        return query;
    }
}

export default Create;
