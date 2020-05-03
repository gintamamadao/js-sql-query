import { TermData, SqlParam } from "../constant/interface";
import Term from "./term";
import TermApi from "./term_api";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/enum";
import { WHERE_TERM_API } from "../constant/constant";

class Where extends TermApi {
    protected whereTerm: Term = {} as Term;

    constructor() {
        super();
        for (const api of Object.keys(WHERE_TERM_API)) {
            const whereTermApi =
                WHERE_TERM_API[api as keyof typeof WHERE_TERM_API];
            (<any>this)[whereTermApi] = function (data: TermData) {
                return this.whereTermApiFn(api, data);
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
            if (Type.func.is<any>(sql)) {
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

    whereEqual: (data: TermData) => this = (data) => this;
    whereNotEqual: (data: TermData) => this = (data) => this;
    whereIn: (data: TermData) => this = (data) => this;
    whereNotIn: (data: TermData) => this = (data) => this;
    whereMore: (data: TermData) => this = (data) => this;
    whereLess: (data: TermData) => this = (data) => this;
    whereMoreEqual: (data: TermData) => this = (data) => this;
    whereLessEqual: (data: TermData) => this = (data) => this;
    whereLike: (data: TermData) => this = (data) => this;
    whereNotLike: (data: TermData) => this = (data) => this;
    whereBetween: (data: TermData) => this = (data) => this;
    whereNotBetween: (data: TermData) => this = (data) => this;
    whereOrEqual: (data: TermData) => this = (data) => this;
    whereOrNotEqual: (data: TermData) => this = (data) => this;
    whereOrIn: (data: TermData) => this = (data) => this;
    whereOrNotIn: (data: TermData) => this = (data) => this;
    whereOrMore: (data: TermData) => this = (data) => this;
    whereOrLess: (data: TermData) => this = (data) => this;
    whereOrMoreEqual: (data: TermData) => this = (data) => this;
    whereOrLessEqual: (data: TermData) => this = (data) => this;
    whereOrLike: (data: TermData) => this = (data) => this;
    whereOrNotLike: (data: TermData) => this = (data) => this;
    whereOrBetween: (data: TermData) => this = (data) => this;
    whereOrNotBetween: (data: TermData) => this = (data) => this;
}

export default Where;
