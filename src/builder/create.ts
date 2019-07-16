import Safe from "./safe";
import { QueryTypes, DialectTypes, TableOptions } from "../constant/enum";
import { TableInfo } from "../constant/interface";
import { Type } from "schema-verify";
import {
    strArrVerify,
    funcInfoVerify,
    funcInputVerify
} from "../verify/builder/index";

class Create extends Safe {
    readonly queryType: QueryTypes = QueryTypes.create;
    protected createSqlStr: string;
    protected createInfo: TableInfo;
    constructor(dialectType: DialectTypes) {
        super();
        this.dialectType = dialectType;
    }

    info(tableInfo: TableInfo | string) {
        if (Type.string.isNotEmpty(tableInfo)) {
            this.createSqlStr = <string>tableInfo;
            return this;
        }
    }
}

export default Create;
