import { TermData } from "../constant/builder/interface";
import Query from "./query";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/builder/enum";
import { WHERE_TERM_API } from "../constant/builder/constant";

class Where extends Query {
    protected whereTerm: Term;

    constructor() {
        super();
        for (const termApi in WHERE_TERM_API) {
            const whereTermApi = WHERE_TERM_API[termApi];
            this[whereTermApi] = function(data: TermData) {
                this.getWhereTermCase()[termApi](data);
                return this;
            };
        }
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
            const term: Term = this.getWhereTermCase();
            if (Type.function.is(sql)) {
                sql = (<Function>sql).bind(this, term);
            }
            term.sqlTerm(sql);
        } else {
            this.termStatus = TermTypes.where;
        }
        return this;
    }

    protected getWhereTermCase(): Term {
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
