import { Type } from "schema-verify";

interface LimitInfo {
    offset: number;
    step: number;
}

class Limit {
    protected limitInfo: LimitInfo;

    limitBuild(query: string): string {
        const limitInfo: LimitInfo = Type.object.safe(this.limitInfo);
        const offset: number = limitInfo.offset;
        const step: number = limitInfo.step;
        if (!Type.number.is(offset) || !Type.number.is(step)) {
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
        if (!Type.number.is(offset) || offset < 0) {
            throw new Error("Illegal Param Offset");
        }
        if (
            !Type.undefinedNull.is(step) &&
            (!Type.number.is(step) || step < 0)
        ) {
            throw new Error("Illegal Param Step");
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
        if (!Type.number.is(offset) || offset < 0) {
            throw new Error("Illegal Param Offset");
        }
        this.limitInfo = {
            offset: offset,
            step: -1
        };
    }

    step(step: number): void {
        if (!Type.number.is(step) || step < 0) {
            throw new Error("Illegal Param Step");
        }
        this.limitInfo = {
            offset: 0,
            step
        };
    }

    paging(page: number, size: number): void {
        if (!Type.number.is(page) || page < 1) {
            throw new Error("Illegal Param Page");
        }
        if (!Type.number.is(size) || size < 0) {
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
