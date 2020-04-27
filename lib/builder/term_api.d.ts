import { TermData } from "../constant/interface";
import Query from "./query";
import Term from "./term";
import { TermTypes } from "../constant/enum";
declare class TermApi extends Query {
    protected termStatus: TermTypes;
    constructor();
    termApiFn(termApi: string, data: TermData): this;
    bracket(): this;
    orBracket(): this;
    protected getTermCase(type: TermTypes): Term;
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