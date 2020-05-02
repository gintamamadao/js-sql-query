import { TermData } from "../constant/interface";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/enum";
import { WHERE_TERM_API } from "../constant/constant";
import ErrMsg from "../error/builder/index";

const TERM_TYPES = Object.values(TermTypes);

class TermApi extends Query {
    protected termStatus: TermTypes = "" as TermTypes;
    constructor() {
        super();
        const termApis = Object.keys(WHERE_TERM_API);
        for (const api of termApis) {
            (<any>this)[api] = function (data: TermData) {
                return this.termApiFn(api, data);
            };
        }
    }

    termApiFn(termApi: string, data: TermData): this {
        const termStatus: TermTypes = this.termStatus;
        if (!TERM_TYPES.includes(termStatus)) {
            throw new Error(ErrMsg.errorTermStatus);
        }
        (<any>this).getTermCase(termStatus)[termApi](data);
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
        let term: Term = (<any>this)[type];
        if (!term || !(term instanceof Term)) {
            term = new Term();
            term.setDialect(this.dialectType);
            (<any>this)[type] = term;
        }
        return term;
    }

    equal: (data: TermData) => this = (data) => this;
    notEqual: (data: TermData) => this = (data) => this;
    in: (data: TermData) => this = (data) => this;
    notIn: (data: TermData) => this = (data) => this;
    more: (data: TermData) => this = (data) => this;
    less: (data: TermData) => this = (data) => this;
    moreEqual: (data: TermData) => this = (data) => this;
    lessEqual: (data: TermData) => this = (data) => this;
    like: (data: TermData) => this = (data) => this;
    notLike: (data: TermData) => this = (data) => this;
    between: (data: TermData) => this = (data) => this;
    notBetween: (data: TermData) => this = (data) => this;
    orEqual: (data: TermData) => this = (data) => this;
    orNotEqual: (data: TermData) => this = (data) => this;
    orIn: (data: TermData) => this = (data) => this;
    orNotIn: (data: TermData) => this = (data) => this;
    orMore: (data: TermData) => this = (data) => this;
    orLess: (data: TermData) => this = (data) => this;
    orMoreEqual: (data: TermData) => this = (data) => this;
    orLessEqual: (data: TermData) => this = (data) => this;
    orLike: (data: TermData) => this = (data) => this;
    orNotLike: (data: TermData) => this = (data) => this;
    orBetween: (data: TermData) => this = (data) => this;
    orNotBetween: (data: TermData) => this = (data) => this;
}

export default TermApi;
