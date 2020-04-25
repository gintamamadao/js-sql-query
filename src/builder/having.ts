import { TermData, SqlParam } from "../constant/interface";
import Where from "./where";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/enum";
import { HAVING_TERM_API } from "../constant/constant";

class Having extends Where {
    protected havingTerm: Term;

    constructor() {
        super();
        for (const termApi in HAVING_TERM_API) {
            const havingTermApi =
                HAVING_TERM_API[termApi as keyof typeof HAVING_TERM_API];
            (<any>this)[havingTermApi] = function (data: TermData) {
                return this.havingTermApiFn(termApi, data);
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

    havingEqual: (data: TermData) => this;
    havingNotEqual: (data: TermData) => this;
    havingIn: (data: TermData) => this;
    havingNotIn: (data: TermData) => this;
    havingMore: (data: TermData) => this;
    havingLess: (data: TermData) => this;
    havingMoreEqual: (data: TermData) => this;
    havingLessEqual: (data: TermData) => this;
    havingLike: (data: TermData) => this;
    havingNotLike: (data: TermData) => this;
    havingBetween: (data: TermData) => this;
    havingNotBetween: (data: TermData) => this;
    havingOrEqual: (data: TermData) => this;
    havingOrNotEqual: (data: TermData) => this;
    havingOrIn: (data: TermData) => this;
    havingOrNotIn: (data: TermData) => this;
    havingOrMore: (data: TermData) => this;
    havingOrLess: (data: TermData) => this;
    havingOrMoreEqual: (data: TermData) => this;
    havingOrLessEqual: (data: TermData) => this;
    havingOrLike: (data: TermData) => this;
    havingOrNotLike: (data: TermData) => this;
    havingOrBetween: (data: TermData) => this;
    havingOrNotBetween: (data: TermData) => this;
}

export default Having;
