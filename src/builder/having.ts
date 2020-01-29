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
            const havingTermApi = HAVING_TERM_API[termApi];
            this[havingTermApi] = function(data: TermData) {
                this.getHavingTermCase()[termApi](data);
                return this;
            };
        }
    }

    havingBracket() {
        this.getHavingTermCase().bracket();
        return this;
    }

    havingOrBracket() {
        this.getHavingTermCase().orBracket();
        return this;
    }

    having(sql?: SqlParam) {
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

    protected getHavingTermCase(): Term {
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
}

export default Having;
