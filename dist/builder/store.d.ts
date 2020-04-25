declare class Store {
    getStore(): string[];
    storeSql(query: string): void;
    isStoreEmpty(): boolean;
    cleanStoreSql(): void;
}
declare const _default: Store;
export default _default;
