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
            const whereTermApi = WHERE_TERM_API[termApi];
            this[whereTermApi] = function(data: TermData) {
                return this.whereTermApiFn(termApi, data);
            };
        }
    }

    whereTermApiFn(termApi, data): this {
        this.getWhereTermCase()[termApi](data);
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

    where(sql?: SqlParam) {
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

    protected getWhereTermCase(): Term {
        return this.getTermCase(TermTypes.where);
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
