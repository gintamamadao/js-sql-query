import { TermData } from "../constant/builder/interface";
import Where from "./where";
import Term from "./term";
import { Type } from "schema-verify";
import { TermTypes } from "../constant/builder/enum";
import { HAVING_TERM_API } from "../constant/builder/constant";

class Having extends Where {
    protected havingTerm: Term;

    constructor() {
        super();
        for (const termApi in HAVING_TERM_API) {
            const whereTermApi = HAVING_TERM_API[termApi];
            this[whereTermApi] = function(data: TermData) {
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
