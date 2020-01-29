import { TermData } from "../constant/interface";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/enum";
import { WHERE_TERM_API } from "../constant/constant";
import ErrMsg from "../error/builder/index";

const TERM_TYPES = Object.values(TermTypes);

class TermApi extends Query {
    protected termStatus: TermTypes;
    constructor() {
        super();
        for (const termApi in WHERE_TERM_API) {
            this[termApi] = function(data: TermData) {
                this.termApiFn(termApi, data);
            };
        }
    }

    termApiFn(termApi: string, data: TermData): this {
        const termStatus: TermTypes = this.termStatus;
        if (!TERM_TYPES.includes(termStatus)) {
            throw new Error(ErrMsg.errorTermStatus);
        }
        this.getTermCase(termStatus)[termApi](data);
        return this;
    }

    bracket(): this {
        const termStatus: TermTypes = this.termStatus;
        if (!TERM_TYPES.includes(termStatus)) {
            throw new Error(ErrMsg.errorTermStatus);
        }
        this.getTermCase(termStatus).bracket();
        return this;
    }

    orBracket(): this {
        const termStatus: TermTypes = this.termStatus;
        if (!TERM_TYPES.includes(termStatus)) {
            throw new Error(ErrMsg.errorTermStatus);
        }
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

    equal: (data: TermData) => this;
    notEqual: (data: TermData) => this;
    in: (data: TermData) => this;
    notIn: (data: TermData) => this;
    more: (data: TermData) => this;
    less: (data: TermData) => this;
    moreEqual: (data: TermData) => this;
    lessEqual: (data: TermData) => this;
    like: (data: TermData) => this;
    notLike: (data: TermData) => this;
    between: (data: TermData) => this;
    notBetween: (data: TermData) => this;
    orEqual: (data: TermData) => this;
    orNotEqual: (data: TermData) => this;
    orIn: (data: TermData) => this;
    orNotIn: (data: TermData) => this;
    orMore: (data: TermData) => this;
    orLess: (data: TermData) => this;
    orMoreEqual: (data: TermData) => this;
    orLessEqual: (data: TermData) => this;
    orLike: (data: TermData) => this;
    orNotLike: (data: TermData) => this;
    orBetween: (data: TermData) => this;
    orNotBetween: (data: TermData) => this;
}

export default TermApi;
