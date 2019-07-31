import { TermData } from "../constant/builder/interface";
import Where from "./where";
import Term from "./term";
import { Type } from "schema-verify";

const TERM_NAME = "havingTerm";
class Having extends Where {
    protected havingTerm: Term;

    havingEqual(data: TermData) {
        this.getTermCase(TERM_NAME).equal(data);
        return this;
    }

    havingNotEqual(data: TermData) {
        this.getTermCase(TERM_NAME).notEqual(data);
        return this;
    }

    havingIn(data: TermData) {
        this.getTermCase(TERM_NAME).in(data);
        return this;
    }

    havingNotIn(data: TermData) {
        this.getTermCase(TERM_NAME).notIn(data);
        return this;
    }

    havingMore(data: TermData) {
        this.getTermCase(TERM_NAME).more(data);
        return this;
    }

    havingLess(data: TermData) {
        this.getTermCase(TERM_NAME).less(data);
        return this;
    }

    havingMoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).moreEqual(data);
        return this;
    }

    havingLessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).lessEqual(data);
        return this;
    }

    havingLike(data: TermData) {
        this.getTermCase(TERM_NAME).like(data);
        return this;
    }

    havingNotLike(data: TermData) {
        this.getTermCase(TERM_NAME).notLike(data);
        return this;
    }

    havingBetween(data: TermData) {
        this.getTermCase(TERM_NAME).between(data);
        return this;
    }

    havingNotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).notBetween(data);
        return this;
    }

    havingOrEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orEqual(data);
        return this;
    }

    havingOrNotEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orNotEqual(data);
        return this;
    }

    havingOrIn(data: TermData) {
        this.getTermCase(TERM_NAME).orIn(data);
        return this;
    }

    havingOrNotIn(data: TermData) {
        this.getTermCase(TERM_NAME).orNotIn(data);
        return this;
    }

    havingOrMore(data: TermData) {
        this.getTermCase(TERM_NAME).orMore(data);
        return this;
    }

    havingOrLess(data: TermData) {
        this.getTermCase(TERM_NAME).orLess(data);
        return this;
    }

    havingOrMoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orMoreEqual(data);
        return this;
    }

    havingOrLessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orLessEqual(data);
        return this;
    }

    havingOrLike(data: TermData) {
        this.getTermCase(TERM_NAME).orLike(data);
        return this;
    }

    havingOrNotLike(data: TermData) {
        this.getTermCase(TERM_NAME).orNotLike(data);
        return this;
    }

    havingOrBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orBetween(data);
        return this;
    }

    havingOrNotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orNotBetween(data);
        return this;
    }

    havingBracket() {
        this.getTermCase(TERM_NAME).bracket();
        return this;
    }

    havingOrBracket() {
        this.getTermCase(TERM_NAME).orBracket();
        return this;
    }

    having(sql: string | Function) {
        this.getTermCase(TERM_NAME).sqlTerm(sql);
        return this;
    }

    protected havingBuild(query: string) {
        const termInstance: Term = this.getTermCase(TERM_NAME);
        const havingSql: string = termInstance.termsBuild();
        if (Type.string.isNotEmpty(havingSql)) {
            query = `${query} HAVING ${havingSql}`;
        }
        return query;
    }
}

export default Having;
