import { TermData } from "../constant/builder/interface";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/builder/enum";
import { WHERE_TERM_API } from "../constant/builder/constant";
import ErrMsg from "../error/builder/index";

const TERM_TYPES = Object.values(TermTypes);
class TermApi extends Query {
    protected termStatus: TermTypes;
    constructor() {
        super();
        for (const termApi in WHERE_TERM_API) {
            this[termApi] = function(data: TermData) {
                const termStatus: TermTypes = this.termStatus;
                if (!TERM_TYPES.includes(termStatus)) {
                    throw new Error(ErrMsg.errorTermStatus);
                }
                this.getTermCase(termStatus)[termApi](data);
                return this;
            };
        }
    }

    bracket() {
        const termStatus: TermTypes = this.termStatus;
        this.getTermCase(termStatus).bracket();
        return this;
    }

    orBracket() {
        const termStatus: TermTypes = this.termStatus;
        this.getTermCase(termStatus).orBracket();
        return this;
    }

    protected getTermCase(type: TermTypes): Term {
        let term: Term = this[type];
        if (!term || !(term instanceof Term)) {
            term = new Term();
            term.setDialect(this.dialectType);
            this[type] = term;
        }
        return term;
    }
}

export default TermApi;
