import { TermData } from "../constant/builder/interface";
import Where from "./where";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/builder/enum";

const TERM_NAME = "havingTerm";
class Having extends Where {
    protected havingTerm: Term;

    havingEqual(data: TermData) {
        this.getHavingTermCase().equal(data);
        return this;
    }

    havingNotEqual(data: TermData) {
        this.getHavingTermCase().notEqual(data);
        return this;
    }

    havingIn(data: TermData) {
        this.getHavingTermCase().in(data);
        return this;
    }

    havingNotIn(data: TermData) {
        this.getHavingTermCase().notIn(data);
        return this;
    }

    havingMore(data: TermData) {
        this.getHavingTermCase().more(data);
        return this;
    }

    havingLess(data: TermData) {
        this.getHavingTermCase().less(data);
        return this;
    }

    havingMoreEqual(data: TermData) {
        this.getHavingTermCase().moreEqual(data);
        return this;
    }

    havingLessEqual(data: TermData) {
        this.getHavingTermCase().lessEqual(data);
        return this;
    }

    havingLike(data: TermData) {
        this.getHavingTermCase().like(data);
        return this;
    }

    havingNotLike(data: TermData) {
        this.getHavingTermCase().notLike(data);
        return this;
    }

    havingBetween(data: TermData) {
        this.getHavingTermCase().between(data);
        return this;
    }

    havingNotBetween(data: TermData) {
        this.getHavingTermCase().notBetween(data);
        return this;
    }

    havingOrEqual(data: TermData) {
        this.getHavingTermCase().orEqual(data);
        return this;
    }

    havingOrNotEqual(data: TermData) {
        this.getHavingTermCase().orNotEqual(data);
        return this;
    }

    havingOrIn(data: TermData) {
        this.getHavingTermCase().orIn(data);
        return this;
    }

    havingOrNotIn(data: TermData) {
        this.getHavingTermCase().orNotIn(data);
        return this;
    }

    havingOrMore(data: TermData) {
        this.getHavingTermCase().orMore(data);
        return this;
    }

    havingOrLess(data: TermData) {
        this.getHavingTermCase().orLess(data);
        return this;
    }

    havingOrMoreEqual(data: TermData) {
        this.getHavingTermCase().orMoreEqual(data);
        return this;
    }

    havingOrLessEqual(data: TermData) {
        this.getHavingTermCase().orLessEqual(data);
        return this;
    }

    havingOrLike(data: TermData) {
        this.getHavingTermCase().orLike(data);
        return this;
    }

    havingOrNotLike(data: TermData) {
        this.getHavingTermCase().orNotLike(data);
        return this;
    }

    havingOrBetween(data: TermData) {
        this.getHavingTermCase().orBetween(data);
        return this;
    }

    havingOrNotBetween(data: TermData) {
        this.getHavingTermCase().orNotBetween(data);
        return this;
    }

    havingBracket() {
        this.getHavingTermCase().bracket();
        return this;
    }

    havingOrBracket() {
        this.getHavingTermCase().orBracket();
        return this;
    }

    having(sql: string | Function | object | undefined) {
        if (Type.undefined.isNot(sql)) {
            this.getHavingTermCase().sqlTerm(sql);
        } else {
            this.termStatus = TermTypes.having;
        }
        return this;
    }

    protected getHavingTermCase() {
        let term: Term = this[TermTypes.having];
        if (!term || !(term instanceof Term)) {
            term = new Term();
            term.setDialect(this.dialectType);
            this[TermTypes.having] = term;
        }
        return term;
    }

    protected havingBuild(query: string) {
        const termInstance: Term = this.getHavingTermCase();
        const havingSql: string = termInstance.termsBuild();
        if (Type.string.isNotEmpty(havingSql)) {
            query = `${query} HAVING ${havingSql}`;
        }
        return query;
    }
}

export default Having;
