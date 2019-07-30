import Insert from "./insert";
import { QueryTypes } from "../constant/builder/enum";

class Replace extends Insert {
    constructor() {
        super();
        this.queryType = QueryTypes.replace;
    }
}

export default Replace;
