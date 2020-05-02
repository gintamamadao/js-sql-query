import { TermData, SqlParam } from "../constant/interface";
import Where from "./where";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/enum";
import { HAVING_TERM_API } from "../constant/constant";

class Having extends Where {
    protected havingTerm: Term = {} as Term;

    constructor() {
        super();
        const termApis = Object.keys(HAVING_TERM_API);
        for (const api of termApis) {
            const havingTermApi =
                HAVING_TERM_API[api as keyof typeof HAVING_TERM_API];
            (<any>this)[havingTermApi] = function (data: TermData) {
                return this.havingTermApiFn(api, data);
            };
        }
    }

    havingTermApiFn(termApi: string, data: TermData): this {
        this.getHavingTermCase()[termApi](data);
        return this;
    }

    havingBracket(): this {
        this.getHavingTermCase().bracket();
        return this;
    }

    havingOrBracket(): this {
        this.getHavingTermCase().orBracket();
        return this;
    }

    having(sql: any): this {
        if (Type.undefined.isNot(sql)) {
            const term: Term = this.getHavingTermCase();
            if (Type.func.is(sql)) {
                sql = sql.bind(this, term);
            }
            term.sqlTerm(sql);
        } else {
            this.termStatus = TermTypes.having;
        }
        return this;
    }

    protected getHavingTermCase(): any {
        return this.getTermCase(TermTypes.having);
    }

    protected havingBuild(query: string) {
        const termInstance: Term = this.getHavingTermCase();
        const havingSql: string = termInstance.termsBuild();
        if (Type.string.isNotEmpty(havingSql)) {
            query = `${query} HAVING ${havingSql}`;
        }
        return query;
    }

    havingEqual: (data: TermData) => this = (data) => this;
    havingNotEqual: (data: TermData) => this = (data) => this;
    havingIn: (data: TermData) => this = (data) => this;
    havingNotIn: (data: TermData) => this = (data) => this;
    havingMore: (data: TermData) => this = (data) => this;
    havingLess: (data: TermData) => this = (data) => this;
    havingMoreEqual: (data: TermData) => this = (data) => this;
    havingLessEqual: (data: TermData) => this = (data) => this;
    havingLike: (data: TermData) => this = (data) => this;
    havingNotLike: (data: TermData) => this = (data) => this;
    havingBetween: (data: TermData) => this = (data) => this;
    havingNotBetween: (data: TermData) => this = (data) => this;
    havingOrEqual: (data: TermData) => this = (data) => this;
    havingOrNotEqual: (data: TermData) => this = (data) => this;
    havingOrIn: (data: TermData) => this = (data) => this;
    havingOrNotIn: (data: TermData) => this = (data) => this;
    havingOrMore: (data: TermData) => this = (data) => this;
    havingOrLess: (data: TermData) => this = (data) => this;
    havingOrMoreEqual: (data: TermData) => this = (data) => this;
    havingOrLessEqual: (data: TermData) => this = (data) => this;
    havingOrLike: (data: TermData) => this = (data) => this;
    havingOrNotLike: (data: TermData) => this = (data) => this;
    havingOrBetween: (data: TermData) => this = (data) => this;
    havingOrNotBetween: (data: TermData) => this = (data) => this;
}

export default Having;
