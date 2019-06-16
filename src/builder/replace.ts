import Insert from "./insert";
import { QueryTypes, DialectTypes } from "../constant/enum";

class Replace extends Insert {
    constructor(dialectType: DialectTypes) {
        super(dialectType);
        this.queryType = QueryTypes.replace;
    }
}

export default Replace;
