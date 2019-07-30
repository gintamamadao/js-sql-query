import { TermData } from "../constant/builder/interface";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";

const TERM_NAME = "whereTerm";
class Where extends Query {
    protected whereTerm: Term;
    constructor() {
        super();
    }

    whereEqual(data: TermData) {
        this.getTermCase(TERM_NAME).equal(data);
        return this;
    }

    whereNotEqual(data: TermData) {
        this.getTermCase(TERM_NAME).notEqual(data);
        return this;
    }

    whereIn(data: TermData) {
        this.getTermCase(TERM_NAME).in(data);
        return this;
    }

    whereNotIn(data: TermData) {
        this.getTermCase(TERM_NAME).notIn(data);
        return this;
    }

    whereMore(data: TermData) {
        this.getTermCase(TERM_NAME).more(data);
        return this;
    }

    whereLess(data: TermData) {
        this.getTermCase(TERM_NAME).less(data);
        return this;
    }

    whereMoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).moreEqual(data);
        return this;
    }

    whereLessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).lessEqual(data);
        return this;
    }

    whereLike(data: TermData) {
        this.getTermCase(TERM_NAME).like(data);
        return this;
    }

    whereNotLike(data: TermData) {
        this.getTermCase(TERM_NAME).notLike(data);
        return this;
    }

    whereBetween(data: TermData) {
        this.getTermCase(TERM_NAME).between(data);
        return this;
    }

    whereNotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).notBetween(data);
        return this;
    }

    whereOrEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orEqual(data);
        return this;
    }

    whereOrNotEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orNotEqual(data);
        return this;
    }

    whereOrIn(data: TermData) {
        this.getTermCase(TERM_NAME).orIn(data);
        return this;
    }

    whereOrNotIn(data: TermData) {
        this.getTermCase(TERM_NAME).orNotIn(data);
        return this;
    }

    whereOrMore(data: TermData) {
        this.getTermCase(TERM_NAME).orMore(data);
        return this;
    }

    whereOrLess(data: TermData) {
        this.getTermCase(TERM_NAME).orLess(data);
        return this;
    }

    whereOrMoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orMoreEqual(data);
        return this;
    }

    whereOrLessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orLessEqual(data);
        return this;
    }

    whereOrLike(data: TermData) {
        this.getTermCase(TERM_NAME).orLike(data);
        return this;
    }

    whereOrNotLike(data: TermData) {
        this.getTermCase(TERM_NAME).orNotLike(data);
        return this;
    }

    whereOrBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orBetween(data);
        return this;
    }

    whereOrNotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orNotBetween(data);
        return this;
    }

    whereBracket() {
        this.getTermCase(TERM_NAME).bracket();
        return this;
    }

    whereOrBracket() {
        this.getTermCase(TERM_NAME).orBracket();
        return this;
    }

    where(sql: string | Function) {
        this.getTermCase(TERM_NAME).sqlTerm(sql);
        return this;
    }

    protected getTermCase(key: string) {
        let term: Term = this[key];
        if (!term || !(term instanceof Term)) {
            term = new Term();
            term.setDialect(this.dialectType);
            this[key] = term;
        }
        return term;
    }

    protected whereBuild(query: string) {
        const whereTerm: Term = this.getTermCase(TERM_NAME);
        const whereSql: string = whereTerm.termsBuild();
        if (Type.string.isNotEmpty(whereSql)) {
            query = `${query} WHERE ${whereSql}`;
        }
        return query;
    }
}

export default Where;
