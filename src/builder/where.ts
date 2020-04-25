import { TermData, SqlParam } from "../constant/interface";
import Term from "./term";
import TermApi from "./term_api";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/enum";
import { WHERE_TERM_API } from "../constant/constant";

class Where extends TermApi {
    protected whereTerm: Term;

    constructor() {
        super();
        for (const termApi in WHERE_TERM_API) {
            const whereTermApi =
                WHERE_TERM_API[termApi as keyof typeof WHERE_TERM_API];
            (<any>this)[whereTermApi] = function (data: TermData) {
                return this.whereTermApiFn(termApi, data);
            };
        }
    }

    whereTermApiFn(termApi: string, data: TermData): this {
        this.getWhereTermCase()[termApi](data);
        return this;
    }

    whereBracket(): this {
        this.getWhereTermCase().bracket();
        return this;
    }

    whereOrBracket(): this {
        this.getWhereTermCase().orBracket();
        return this;
    }

    where(sql?: any): this {
        if (Type.undefined.isNot(sql)) {
            const term: Term = this.getWhereTermCase();
            if (Type.func.is(sql)) {
                sql = sql.bind(this, term);
            }
            term.sqlTerm(sql);
        } else {
            this.termStatus = TermTypes.where;
        }
        return this;
    }

    protected getWhereTermCase(): any {
        return this.getTermCase(TermTypes.where);
    }

    protected whereBuild(query: string): string {
        const whereTerm: Term = this.getWhereTermCase();
        const whereSql: string = whereTerm.termsBuild();
        if (Type.string.isNotEmpty(whereSql)) {
            query = `${query} WHERE ${whereSql}`;
        }
        return query;
    }

    whereEqual: (data: TermData) => this;
    whereNotEqual: (data: TermData) => this;
    whereIn: (data: TermData) => this;
    whereNotIn: (data: TermData) => this;
    whereMore: (data: TermData) => this;
    whereLess: (data: TermData) => this;
    whereMoreEqual: (data: TermData) => this;
    whereLessEqual: (data: TermData) => this;
    whereLike: (data: TermData) => this;
    whereNotLike: (data: TermData) => this;
    whereBetween: (data: TermData) => this;
    whereNotBetween: (data: TermData) => this;
    whereOrEqual: (data: TermData) => this;
    whereOrNotEqual: (data: TermData) => this;
    whereOrIn: (data: TermData) => this;
    whereOrNotIn: (data: TermData) => this;
    whereOrMore: (data: TermData) => this;
    whereOrLess: (data: TermData) => this;
    whereOrMoreEqual: (data: TermData) => this;
    whereOrLessEqual: (data: TermData) => this;
    whereOrLike: (data: TermData) => this;
    whereOrNotLike: (data: TermData) => this;
    whereOrBetween: (data: TermData) => this;
    whereOrNotBetween: (data: TermData) => this;
}

export default Where;
