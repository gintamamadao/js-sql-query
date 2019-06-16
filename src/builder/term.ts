import * as Util from "../util/util";
import { TermSign, TermLogic, DialectTypes } from "../constant/enum";
import { TermData, TermInfo, TermBracket } from "../constant/interface";
import Safe from "./safe";

const SQL_NAME = "termSql";
class Term extends Safe {
    protected termInfos: TermInfo[];
    protected termBrackets: TermBracket[];
    protected termSql: string | Function;
    constructor(dialectType: DialectTypes) {
        super();
        this.termInfos = [];
        this.termBrackets = [];
        this.dialectType = dialectType;
    }

    build(): string {
        return this.termsBuild();
    }

    termsBuild(): string {
        const termSql: string = this.formatTermSql();
        if (Util.isNotEmptyStr(termSql)) {
            return termSql;
        }
        const termInfos: TermInfo[] = this.termInfos;
        const termBrackets: TermBracket[] = this.termBrackets;
        if (!Util.isNotEmptyArr(termInfos)) {
            return "";
        }
        const allTermStr = !Util.isNotEmptyArr(termBrackets)
            ? this.formatTerms(termInfos)
            : this.formatTermBrackets(termBrackets, termInfos);
        return allTermStr;
    }

    protected formatTermSql(): string {
        return this.formatManualSql(SQL_NAME);
    }

    protected formatTermBrackets(
        brackets: TermBracket[],
        terms: TermInfo[]
    ): string {
        let allTermStr: string = "";
        brackets = Util.safeToArr(brackets);
        terms = Util.safeToArr(terms);
        const bracketsLen = brackets.length;
        const termsLen = terms.length;
        for (let i = 0; i < bracketsLen; i++) {
            const curBracket: TermBracket = brackets[i];
            const perBracket: TermBracket = brackets[i - 1];
            const nextBracket: TermBracket = brackets[i + 1];
            const curPos: number = curBracket.position;
            const curLogic: TermLogic = curBracket.logic;
            let prePos: number = 0;
            let nextPos: number = termsLen;
            if (Util.isNotEmptyObj(perBracket)) {
                prePos = perBracket.position;
            }
            if (Util.isNotEmptyObj(nextBracket)) {
                nextPos = nextBracket.position;
            }
            const preTerms: TermInfo[] = terms.slice(prePos, curPos);
            const nextTerms: TermInfo[] = terms.slice(curPos, nextPos);

            const needFullBracket =
                bracketsLen === 1 ||
                i + 1 === bracketsLen ||
                nextPos === termsLen;

            const termStr: string = this.formatBracketTerm(
                needFullBracket,
                curLogic,
                preTerms,
                nextTerms
            );

            if (!Util.isNotEmptyStr(termStr)) {
                continue;
            }

            allTermStr = Util.isNotEmptyStr(allTermStr)
                ? `${allTermStr} ${termStr}`
                : termStr;
        }

        return allTermStr;
    }

    protected formatBracketTerm(
        needFullBracket: boolean,
        logic: TermLogic,
        preTerms: TermInfo[],
        nextTerms: TermInfo[]
    ): string {
        preTerms = Util.safeToArr(preTerms);
        nextTerms = Util.safeToArr(nextTerms);
        const preTermsStr: string = this.formatTerms(preTerms);

        if (preTerms.length <= 0 || nextTerms.length <= 0) {
            return "";
        }

        if (needFullBracket) {
            const nextTermsStr: string = this.formatTerms(nextTerms);
            return `( ${preTermsStr} ) ${logic} ( ${nextTermsStr} )`;
        }

        return `( ${preTermsStr} ) ${logic}`;
    }

    protected formatTerms(terms: TermInfo[]): string {
        terms = Util.safeToArr(terms);
        let allTermStr: string = "";
        for (const term of terms) {
            if (!Util.isNotEmptyObj(term)) {
                continue;
            }
            const field: string = this.safeKey(term.field);
            const value: string | number | string[] = term.value;
            const sign: TermSign = term.sign;
            const logic: TermLogic = term.logic;
            const termValue: string = this.formatTermValue(value, sign);
            const termStr: string = `${field} ${sign} ${termValue}`;

            if (!Util.isNotEmptyStr(allTermStr)) {
                allTermStr = termStr;
                continue;
            }

            allTermStr = `${allTermStr} ${logic} ${termStr}`;
        }

        return allTermStr;
    }

    protected formatTermValue(
        value: string | number | string[],
        sign: TermSign
    ): string {
        let termValue: string;
        if (sign === TermSign.in || sign === TermSign.notIn) {
            if (!Util.isNotEmptyArr(value)) {
                throw new Error("Illegal Term Value (need Array)");
            }
            termValue = (<string[]>value)
                .map(item => this.safeValue(item))
                .join(", ");
            return `( ${termValue} )`;
        }

        if (sign === TermSign.between || sign === TermSign.notBetween) {
            if (!Util.isNotEmptyArr(value) || (<string[]>value).length !== 2) {
                throw new Error("Illegal Term Value (need Array[2])");
            }
            const lower = this.safeValue(value[0]);
            const upper = this.safeValue(value[1]);
            return `${lower} AND ${upper}`;
        }

        if (!Util.isString(value) && !Util.isLegalNum(value)) {
            throw new Error("Illegal Term Value");
        }

        if (sign === TermSign.like || sign === TermSign.notlike) {
            value = `%${value}%`;
        }

        termValue = this.safeValue(<string | number>value);

        return termValue;
    }

    termCache(data: TermData, sign: TermSign, logic: TermLogic) {
        if (!Util.isNotEmptyObj(data)) {
            throw new Error("Illegal Term data");
        }
        if (!Util.isNotEmptyStr(sign) || !Util.isNotEmptyStr(logic)) {
            throw new Error("Illegal Param");
        }
        const termInfos: TermInfo[] = Util.safeToArr(this.termInfos);
        const termsArr: TermInfo[] = [];
        for (const field in data) {
            const value: string | number | string[] = data[field];
            let isCheck = false;
            if (sign === TermSign.in || sign === TermSign.notIn) {
                if (!Util.isNotEmptyArr(value)) {
                    throw new Error("Illegal Func Value");
                }
                isCheck = true;
            }
            if (sign === TermSign.between || sign === TermSign.notBetween) {
                if (
                    !Util.isNotEmptyArr(value) ||
                    (<string[]>value).length !== 2
                ) {
                    throw new Error("Illegal Func Value");
                }
                isCheck = true;
            }
            if (!Util.isString(value) && !Util.isLegalNum(value) && !isCheck) {
                throw new Error("Illegal Func Value");
            }
            const term: TermInfo = {
                field,
                value,
                sign,
                logic
            };
            termsArr.push(term);
        }
        this.termInfos = [].concat(termInfos, termsArr);
        return this;
    }

    bracketTerm(logic: TermLogic) {
        const termInfos: TermInfo[] = Util.safeToArr(this.termInfos);
        const termBrackets: TermBracket[] = Util.safeToArr(this.termBrackets);
        const termsLen: number = termInfos.length;
        if (termsLen <= 0) {
            return;
        }
        for (const bracket of termBrackets) {
            const position: number = bracket.position;
            if (position === termsLen) {
                return;
            }
        }
        const bracket: TermBracket = {
            position: termsLen,
            logic
        };
        termBrackets.push(bracket);
        this.termBrackets = termBrackets;
        return this;
    }

    sqlTerm(sql: string | Function) {
        this.manualSql(sql, SQL_NAME);
    }

    equal(data: TermData) {
        return this.and(data, TermSign.equal);
    }

    noEqual(data: TermData) {
        return this.and(data, TermSign.noEqual);
    }

    inEqual(data: TermData) {
        return this.and(data, TermSign.in);
    }

    notInEqual(data: TermData) {
        return this.and(data, TermSign.notIn);
    }

    more(data: TermData) {
        return this.and(data, TermSign.more);
    }

    less(data: TermData) {
        return this.and(data, TermSign.less);
    }

    moreEqual(data: TermData) {
        return this.and(data, TermSign.moreEqual);
    }

    lessEqual(data: TermData) {
        return this.and(data, TermSign.lessEqual);
    }

    like(data: TermData) {
        return this.and(data, TermSign.like);
    }

    notLike(data: TermData) {
        return this.and(data, TermSign.notlike);
    }

    between(data: TermData) {
        return this.and(data, TermSign.between);
    }

    notBetween(data: TermData) {
        return this.and(data, TermSign.notBetween);
    }

    orEqual(data: TermData) {
        return this.or(data, TermSign.equal);
    }

    orNoEqual(data: TermData) {
        return this.or(data, TermSign.noEqual);
    }

    orInEqual(data: TermData) {
        return this.or(data, TermSign.in);
    }

    orNotInEqual(data: TermData) {
        return this.or(data, TermSign.notIn);
    }

    orMore(data: TermData) {
        return this.or(data, TermSign.more);
    }

    orLess(data: TermData) {
        return this.or(data, TermSign.less);
    }

    orMoreEqual(data: TermData) {
        return this.or(data, TermSign.moreEqual);
    }

    orLessEqual(data: TermData) {
        return this.or(data, TermSign.lessEqual);
    }

    orLike(data: TermData) {
        return this.or(data, TermSign.like);
    }

    orBetween(data: TermData) {
        return this.or(data, TermSign.between);
    }

    orNotBetween(data: TermData) {
        return this.or(data, TermSign.notBetween);
    }

    orNotLike(data: TermData) {
        return this.or(data, TermSign.notlike);
    }

    bracket() {
        return this.bracketTerm(TermLogic.and);
    }

    orBracket() {
        return this.bracketTerm(TermLogic.or);
    }

    protected and(data: TermData, sign: TermSign) {
        return this.termCache(data, sign, TermLogic.and);
    }

    protected or(data: TermData, sign: TermSign) {
        return this.termCache(data, sign, TermLogic.or);
    }
}

export default Term;
