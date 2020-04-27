import { TermSign, TermLogic } from "../constant/enum";
import { TermData, TermInfo, TermBracket, SqlParam } from "../constant/interface";
import Base from "./base";
declare class Term extends Base {
    protected termInfos: TermInfo[];
    protected termBrackets: TermBracket[];
    protected termSql: string | Function;
    constructor();
    build(): string;
    termsBuild(): string;
    protected formatTermSql(): string;
    protected formatTermBrackets(brackets: TermBracket[], terms: TermInfo[]): string;
    protected formatBracketTerm(needFullBracket: boolean, logic: TermLogic, preTerms: TermInfo[], nextTerms: TermInfo[]): string;
    protected formatTerms(terms: TermInfo[]): string;
    protected formatTermValue(value: any, sign: TermSign): string;
    termCache(data: TermData, sign: TermSign, logic: TermLogic): this;
    bracketTerm(logic: TermLogic): this;
    sqlTerm(sql: SqlParam): void;
    equal(data: TermData): this;
    notEqual(data: TermData): this;
    in(data: TermData): this;
    notIn(data: TermData): this;
    more(data: TermData): this;
    less(data: TermData): this;
    moreEqual(data: TermData): this;
    lessEqual(data: TermData): this;
    like(data: TermData): this;
    notLike(data: TermData): this;
    between(data: TermData): this;
    notBetween(data: TermData): this;
    orEqual(data: TermData): this;
    orNotEqual(data: TermData): this;
    orIn(data: TermData): this;
    orNotIn(data: TermData): this;
    orMore(data: TermData): this;
    orLess(data: TermData): this;
    orMoreEqual(data: TermData): this;
    orLessEqual(data: TermData): this;
    orLike(data: TermData): this;
    orBetween(data: TermData): this;
    orNotBetween(data: TermData): this;
    orNotLike(data: TermData): this;
    bracket(): this;
    orBracket(): this;
    protected and(data: TermData, sign: TermSign): this;
    protected or(data: TermData, sign: TermSign): this;
}
export default Term;