import Safe from "./safe";
import { QueryTypes, DialectTypes, TableOptions } from "../constant/enum";
import { TableInfo } from "../constant/interface";

class Create extends Safe {
    readonly queryType: QueryTypes = QueryTypes.create;
    protected createSqlStr: string;
    protected createInfo;
    constructor(dialectType: DialectTypes) {
        super();
        this.createInfo = {};
        this.dialectType = dialectType;
    }

    
}

export default Create;
