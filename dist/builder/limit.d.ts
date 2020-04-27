interface LimitInfo {
    offset: number;
    step: number;
}
declare class Limit {
    protected limitInfo: LimitInfo;
    limitBuild(query: string): string;
    limit(offset: number, step?: number): void;
    offset(offset: number): void;
    step(step: number): void;
    paging(page: number, size: number): void;
}
export default Limit;
