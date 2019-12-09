import { TermData } from "../constant/builder/interface";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/builder/enum";

class Where extends Query {
    protected whereTerm: Term;

    whereEqual(data: TermData) {
        this.getWhereTermCase().equal(data);
        return this;
    }

    whereNotEqual(data: TermData) {
        this.getWhereTermCase().notEqual(data);
        return this;
    }

    whereIn(data: TermData) {
        this.getWhereTermCase().in(data);
        return this;
    }

    whereNotIn(data: TermData) {
        this.getWhereTermCase().notIn(data);
        return this;
    }

    whereMore(data: TermData) {
        this.getWhereTermCase().more(data);
        return this;
    }

    whereLess(data: TermData) {
        this.getWhereTermCase().less(data);
        return this;
    }

    whereMoreEqual(data: TermData) {
        this.getWhereTermCase().moreEqual(data);
        return this;
    }

    whereLessEqual(data: TermData) {
        this.getWhereTermCase().lessEqual(data);
        return this;
    }

    whereLike(data: TermData) {
        this.getWhereTermCase().like(data);
        return this;
    }

    whereNotLike(data: TermData) {
        this.getWhereTermCase().notLike(data);
        return this;
    }

    whereBetween(data: TermData) {
        this.getWhereTermCase().between(data);
        return this;
    }

    whereNotBetween(data: TermData) {
        this.getWhereTermCase().notBetween(data);
        return this;
    }

    whereOrEqual(data: TermData) {
        this.getWhereTermCase().orEqual(data);
        return this;
    }

    whereOrNotEqual(data: TermData) {
        this.getWhereTermCase().orNotEqual(data);
        return this;
    }

    whereOrIn(data: TermData) {
        this.getWhereTermCase().orIn(data);
        return this;
    }

    whereOrNotIn(data: TermData) {
        this.getWhereTermCase().orNotIn(data);
        return this;
    }

    whereOrMore(data: TermData) {
        this.getWhereTermCase().orMore(data);
        return this;
    }

    whereOrLess(data: TermData) {
        this.getWhereTermCase().orLess(data);
        return this;
    }

    whereOrMoreEqual(data: TermData) {
        this.getWhereTermCase().orMoreEqual(data);
        return this;
    }

    whereOrLessEqual(data: TermData) {
        this.getWhereTermCase().orLessEqual(data);
        return this;
    }

    whereOrLike(data: TermData) {
        this.getWhereTermCase().orLike(data);
        return this;
    }

    whereOrNotLike(data: TermData) {
        this.getWhereTermCase().orNotLike(data);
        return this;
    }

    whereOrBetween(data: TermData) {
        this.getWhereTermCase().orBetween(data);
        return this;
    }

    whereOrNotBetween(data: TermData) {
        this.getWhereTermCase().orNotBetween(data);
        return this;
    }

    whereBracket() {
        this.getWhereTermCase().bracket();
        return this;
    }

    whereOrBracket() {
        this.getWhereTermCase().orBracket();
        return this;
    }

    where(sql: string | Function | object | undefined) {
        if (Type.undefined.isNot(sql)) {
            this.getWhereTermCase().sqlTerm(sql);
        } else {
            this.termStatus = TermTypes.where;
        }
        return this;
    }

    protected getWhereTermCase() {
        let term: Term = this[TermTypes.where];
        if (!term || !(term instanceof Term)) {
            term = new Term();
            term.setDialect(this.dialectType);
            this[TermTypes.where] = term;
        }
        return term;
    }

    protected whereBuild(query: string) {
        const whereTerm: Term = this.getWhereTermCase();
        const whereSql: string = whereTerm.termsBuild();
        if (Type.string.isNotEmpty(whereSql)) {
            query = `${query} WHERE ${whereSql}`;
        }
        return query;
    }
}

export default Where;
