import { TermData } from "../constant/interface";
import { DialectTypes } from "../constant/enum";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";

const TERM_NAME = "whereTerm";
class Where extends Query {
    protected whereTerm: Term;
    constructor() {
        super();
    }

    where$Equal(data: TermData) {
        this.getTermCase(TERM_NAME).equal(data);
        return this;
    }

    where$NoEqual(data: TermData) {
        this.getTermCase(TERM_NAME).noEqual(data);
        return this;
    }

    where$In(data: TermData) {
        this.getTermCase(TERM_NAME).in(data);
        return this;
    }

    where$NotIn(data: TermData) {
        this.getTermCase(TERM_NAME).notIn(data);
        return this;
    }

    where$More(data: TermData) {
        this.getTermCase(TERM_NAME).more(data);
        return this;
    }

    where$Less(data: TermData) {
        this.getTermCase(TERM_NAME).less(data);
        return this;
    }

    where$MoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).moreEqual(data);
        return this;
    }

    where$LessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).lessEqual(data);
        return this;
    }

    where$Like(data: TermData) {
        this.getTermCase(TERM_NAME).like(data);
        return this;
    }

    where$NotLike(data: TermData) {
        this.getTermCase(TERM_NAME).notLike(data);
        return this;
    }

    where$Between(data: TermData) {
        this.getTermCase(TERM_NAME).between(data);
        return this;
    }

    where$NotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).notBetween(data);
        return this;
    }

    where$OrEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orEqual(data);
        return this;
    }

    where$OrNoEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orNoEqual(data);
        return this;
    }

    where$OrIn(data: TermData) {
        this.getTermCase(TERM_NAME).orIn(data);
        return this;
    }

    where$OrNotIn(data: TermData) {
        this.getTermCase(TERM_NAME).orNotIn(data);
        return this;
    }

    where$OrMore(data: TermData) {
        this.getTermCase(TERM_NAME).orMore(data);
        return this;
    }

    where$OrLess(data: TermData) {
        this.getTermCase(TERM_NAME).orLess(data);
        return this;
    }

    where$OrMoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orMoreEqual(data);
        return this;
    }

    where$OrLessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orLessEqual(data);
        return this;
    }

    where$OrLike(data: TermData) {
        this.getTermCase(TERM_NAME).orLike(data);
        return this;
    }

    where$OrNotLike(data: TermData) {
        this.getTermCase(TERM_NAME).orNotLike(data);
        return this;
    }

    where$OrBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orBetween(data);
        return this;
    }

    where$OrNotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orNotBetween(data);
        return this;
    }

    where$Bracket() {
        this.getTermCase(TERM_NAME).bracket();
        return this;
    }

    where$OrBracket() {
        this.getTermCase(TERM_NAME).orBracket();
        return this;
    }

    where(sql: string | Function) {
        this.getTermCase(TERM_NAME).sqlTerm(sql);
        return this;
    }

    protected getTermCase(key: string) {
        let term: Term = this[key];
        const type: DialectTypes = this.dialectType;
        if (!term || !(term instanceof Term)) {
            term = new Term(type);
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
