import { Type } from "schema-verify";
import {
    integerVerify,
    pageVerify,
    naturalVerify,
    limitInfoVerify
} from "../verify/index";
import ErrMsg from "../error/index";

interface LimitInfo {
    offset: number;
    step: number;
}

class Limit {
    protected limitInfo: LimitInfo;

    limitBuild(query: string): string {
        const limitInfo: LimitInfo = this.limitInfo;
        if (!limitInfoVerify(limitInfo)) {
            return query;
        }
        const offset: number = limitInfo.offset;
        const step: number = limitInfo.step;
        if (offset === 0) {
            return `${query} LIMIT ${step}`;
        }
        if (step === -1) {
            return `${query} OFFSET ${offset}`;
        }
        return `${query} LIMIT ${step} OFFSET ${offset}`;
    }

    limit(offset: number, step?: number): void {
        if (!integerVerify(offset)) {
            throw new Error(ErrMsg.errorOffset);
        }
        if (Type.undefined.isNot(step) && !integerVerify(step)) {
            throw new Error(ErrMsg.errorStep);
        }
        let limitInfo: LimitInfo;
        if (Type.number.is(offset) && Type.number.is(step)) {
            limitInfo = {
                offset,
                step
            };
        }
        if (Type.number.is(offset) && !Type.number.is(step)) {
            limitInfo = {
                offset: 0,
                step: offset
            };
        }
        this.limitInfo = limitInfo;
    }

    offset(offset: number) {
        if (!integerVerify(offset)) {
            throw new Error(ErrMsg.errorOffset);
        }
        this.limitInfo = {
            offset: offset,
            step: -1
        };
    }

    step(step: number): void {
        if (!integerVerify(step)) {
            throw new Error(ErrMsg.errorStep);
        }
        this.limitInfo = {
            offset: 0,
            step
        };
    }

    paging(page: number, size: number): void {
        if (!pageVerify(page)) {
            throw new Error(ErrMsg.errorPage);
        }
        if (!naturalVerify(size)) {
            throw new Error(ErrMsg.errorSize);
        }
        const offset = (page - 1) * size;
        this.limitInfo = {
            offset,
            step: size
        };
    }
}

export default Limit;
