import * as Util from "../util/util";

interface LimitInfo {
    offset: number;
    step: number;
}

class Limit {
    protected limitInfo: LimitInfo;

    limitBuild(query: string): string {
        const limitInfo: LimitInfo = Util.safeToObj(this.limitInfo);
        const offset: number = limitInfo.offset;
        const step: number = limitInfo.step;
        if (!Util.isLegalNum(offset) || !Util.isLegalNum(step)) {
            return query;
        }
        if (offset === 0) {
            return `${query} LIMIT ${step}`;
        }
        if (step === -1) {
            return `${query} OFFSET ${offset}`;
        }
        return `${query} LIMIT ${step} OFFSET ${offset}`;
    }

    limit(offset: number, step?: number): void {
        if (!Util.isLegalNum(offset) || offset < 0) {
            throw new Error("Illegal Param Offset");
        }
        if (
            !Util.isUndefinedNull(step) &&
            (!Util.isLegalNum(step) || step < 0)
        ) {
            throw new Error("Illegal Param Step");
        }
        let limitInfo: LimitInfo;
        if (Util.isLegalNum(offset) && Util.isLegalNum(step)) {
            limitInfo = {
                offset,
                step
            };
        }
        if (Util.isLegalNum(offset) && !Util.isLegalNum(step)) {
            limitInfo = {
                offset: 0,
                step: offset
            };
        }
        this.limitInfo = limitInfo;
    }

    offset(offset: number) {
        if (!Util.isLegalNum(offset) || offset < 0) {
            throw new Error("Illegal Param Offset");
        }
        this.limitInfo = {
            offset: offset,
            step: -1
        };
    }

    step(step: number): void {
        if (!Util.isLegalNum(step) || step < 0) {
            throw new Error("Illegal Param Step");
        }
        this.limitInfo = {
            offset: 0,
            step
        };
    }

    paging(page: number, size: number): void {
        if (!Util.isLegalNum(page) || page < 1) {
            throw new Error("Illegal Param Page");
        }
        if (!Util.isLegalNum(size) || size < 0) {
            throw new Error("Illegal Param Size");
        }
        const offset = (page - 1) * size;
        this.limitInfo = {
            offset,
            step: size
        };
    }
}

export default Limit;
