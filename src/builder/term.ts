import { TermSign, TermLogic } from "../constant/builder/enum";
import { TermData, TermInfo, TermBracket } from "../constant/builder/interface";
import Base from "./base";
import { Type } from "schema-verify";
import {
    termDataVerify,
    termSignVerify,
    termLogicVerify,
    termBracketVerify,
    termValueVerify,
    termInVerify,
    termBetweenVerify,
    termInfoVerify
} from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

const SQL_NAME = "termSql";
class Term extends Base {
    protected termInfos: TermInfo[];
    protected termBrackets: TermBracket[];
    protected termSql: string | Function;
    constructor() {
        super();
        this.termInfos = [];
        this.termBrackets = [];
    }

    build(): string {
        return this.termsBuild();
    }

    termsBuild(): string {
        const termSql: string = this.formatTermSql();
        if (Type.string.isNotEmpty(termSql)) {
            return termSql;
        }
        const termInfos: TermInfo[] = this.termInfos;
        const termBrackets: TermBracket[] = this.termBrackets;
        if (!Type.array.isNotEmpty(termInfos)) {
            return "";
        }
        const allTermStr = !Type.array.isNotEmpty(termBrackets)
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
        brackets = Type.array.safe(brackets);
        terms = Type.array.safe(terms);
        const bracketsLen = brackets.length;
        const termsLen = terms.length;
        for (let i = 0; i < bracketsLen; i++) {
            const curBracket: TermBracket = brackets[i];
            const perBracket: TermBracket = brackets[i - 1];
            const nextBracket: TermBracket = brackets[i + 1];
            if (!termBracketVerify(curBracket)) {
                throw new Error(ErrMsg.errorTermBracket);
            }
            const curPos: number = curBracket.position;
            const curLogic: TermLogic = curBracket.logic;
            let prePos: number = 0;
            let nextPos: number = termsLen;
            if (termBracketVerify(perBracket)) {
                prePos = perBracket.position;
            }
            if (termBracketVerify(nextBracket)) {
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

            if (!Type.string.isNotEmpty(termStr)) {
                continue;
            }

            allTermStr = Type.string.isNotEmpty(allTermStr)
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
        preTerms = Type.array.safe(preTerms);
        nextTerms = Type.array.safe(nextTerms);
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
        terms = Type.array.safe(terms);
        let allTermStr: string = "";
        for (const term of terms) {
            if (!termInfoVerify(term)) {
                throw new Error(ErrMsg.errorTermInfo);
            }
            const field: string = this.safeKey(term.field);
            const value = term.value;
            const sign: TermSign = term.sign;
            const logic: TermLogic = term.logic;
            const termValue: string = this.formatTermValue(value, sign);
            const termStr: string = `${field} ${sign} ${termValue}`;

            if (!Type.string.isNotEmpty(allTermStr)) {
                allTermStr = termStr;
                continue;
            }

            allTermStr = `${allTermStr} ${logic} ${termStr}`;
        }

        return allTermStr;
    }

    protected formatTermValue(value, sign: TermSign): string {
        let termValue: string;
        if (sign === TermSign.in || sign === TermSign.notIn) {
            if (!termInVerify(value)) {
                throw new Error(ErrMsg.errorTermValue);
            }
            termValue = value.map(item => this.safeValue(item)).join(", ");
            return `( ${termValue} )`;
        }

        if (sign === TermSign.between || sign === TermSign.notBetween) {
            if (!termBetweenVerify(value)) {
                throw new Error(ErrMsg.errorTermValue);
            }
            const lower = this.safeValue(value[0]);
            const upper = this.safeValue(value[1]);
            return `${lower} AND ${upper}`;
        }

        if (!termValueVerify(value)) {
            throw new Error(ErrMsg.errorTermValue);
        }

        if (sign === TermSign.like || sign === TermSign.notlike) {
            value = `%${value}%`;
        }

        termValue = this.safeValue(value);

        return termValue;
    }

    termCache(data: TermData, sign: TermSign, logic: TermLogic) {
        if (!termDataVerify(data)) {
            throw new Error(ErrMsg.errorTermdata);
        }
        if (!termSignVerify(sign)) {
            throw new Error(ErrMsg.errorTermSign);
        }
        if (!termLogicVerify(logic)) {
            throw new Error(ErrMsg.errorTermLogic);
        }
        const termInfos: TermInfo[] = Type.array.safe(this.termInfos);
        const termsArr: TermInfo[] = [];
        for (const field in data) {
            const value = data[field];
            switch (sign) {
                case TermSign.in:
                case TermSign.notIn:
                    if (!termInVerify(value)) {
                        throw new Error(ErrMsg.errorTermValue);
                    }
                    break;
                case TermSign.between:
                case TermSign.notBetween:
                    if (!termBetweenVerify(value)) {
                        throw new Error(ErrMsg.errorTermValue);
                    }
                    break;
                default:
                    if (!termValueVerify(value)) {
                        throw new Error(ErrMsg.errorTermValue);
                    }
                    break;
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
        const termInfos: TermInfo[] = Type.array.safe(this.termInfos);
        const termBrackets: TermBracket[] = Type.array.safe(this.termBrackets);
        const termsLen: number = termInfos.length;
        if (termsLen <= 0) {
            return;
        }
        for (const bracket of termBrackets) {
            if (!termBracketVerify(bracket)) {
                continue;
            }
            const position: number = bracket.position;
            if (position === termsLen) {
                return;
            }
        }
        const bracket: TermBracket = {
            position: termsLen,
            logic
        };
        if (termBracketVerify(bracket)) {
            termBrackets.push(bracket);
        }
        this.termBrackets = termBrackets;
        return this;
    }

    sqlTerm(sql: string | Function | object) {
        this.manualSql(sql, SQL_NAME);
    }

    equal(data: TermData) {
        return this.and(data, TermSign.equal);
    }

    notEqual(data: TermData) {
        return this.and(data, TermSign.notEqual);
    }

    in(data: TermData) {
        return this.and(data, TermSign.in);
    }

    notIn(data: TermData) {
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

    orNotEqual(data: TermData) {
        return this.or(data, TermSign.notEqual);
    }

    orIn(data: TermData) {
        return this.or(data, TermSign.in);
    }

    orNotIn(data: TermData) {
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
