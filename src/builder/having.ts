import * as Util from "../util/util";
import { TermData } from "../constant/interface";
import Where from "./where";
import Term from "./term";

const TERM_NAME = "havingTerm";
class Having extends Where {
    protected havingTerm: Term;
    constructor() {
        super();
    }

    having$Equal(data: TermData) {
        this.getTermCase(TERM_NAME).equal(data);
        return this;
    }

    having$NoEqual(data: TermData) {
        this.getTermCase(TERM_NAME).noEqual(data);
        return this;
    }

    having$InEqual(data: TermData) {
        this.getTermCase(TERM_NAME).inEqual(data);
        return this;
    }

    having$NotInEqual(data: TermData) {
        this.getTermCase(TERM_NAME).notInEqual(data);
        return this;
    }

    having$More(data: TermData) {
        this.getTermCase(TERM_NAME).more(data);
        return this;
    }

    having$Less(data: TermData) {
        this.getTermCase(TERM_NAME).less(data);
        return this;
    }

    having$MoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).moreEqual(data);
        return this;
    }

    having$LessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).lessEqual(data);
        return this;
    }

    having$Like(data: TermData) {
        this.getTermCase(TERM_NAME).like(data);
        return this;
    }

    having$NotLike(data: TermData) {
        this.getTermCase(TERM_NAME).notLike(data);
        return this;
    }

    having$Between(data: TermData) {
        this.getTermCase(TERM_NAME).between(data);
        return this;
    }

    having$NotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).notBetween(data);
        return this;
    }

    having$OrEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orEqual(data);
        return this;
    }

    having$OrNoEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orNoEqual(data);
        return this;
    }

    having$OrInEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orInEqual(data);
        return this;
    }

    having$OrNotInEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orNotInEqual(data);
        return this;
    }

    having$OrMore(data: TermData) {
        this.getTermCase(TERM_NAME).orMore(data);
        return this;
    }

    having$OrLess(data: TermData) {
        this.getTermCase(TERM_NAME).orLess(data);
        return this;
    }

    having$OrMoreEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orMoreEqual(data);
        return this;
    }

    having$OrLessEqual(data: TermData) {
        this.getTermCase(TERM_NAME).orLessEqual(data);
        return this;
    }

    having$OrLike(data: TermData) {
        this.getTermCase(TERM_NAME).orLike(data);
        return this;
    }

    having$OrNotLike(data: TermData) {
        this.getTermCase(TERM_NAME).orNotLike(data);
        return this;
    }

    having$OrBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orBetween(data);
        return this;
    }

    having$OrNotBetween(data: TermData) {
        this.getTermCase(TERM_NAME).orNotBetween(data);
        return this;
    }

    having$Bracket() {
        this.getTermCase(TERM_NAME).bracket();
        return this;
    }

    having$OrBracket() {
        this.getTermCase(TERM_NAME).orBracket();
        return this;
    }

    having(sql: string | Function) {
        this.getTermCase(TERM_NAME).sqlTerm(sql);
        return this;
    }

    protected havingBuild(query: string) {
        const termInstance: Term = this.getTermCase(TERM_NAME);
        const havingSql: string = termInstance.termsBuild();
        if (Util.isNotEmptyStr(havingSql)) {
            query = `${query} HAVING ${havingSql}`;
        }
        return query;
    }
}

export default Having;
