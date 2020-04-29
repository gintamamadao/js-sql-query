import { ConnectConfig } from "../../constant/interface";
declare class BaseConnect {
    dbConfig: ConnectConfig;
    pool: any;
    constructor(config: ConnectConfig);
    setConfig(config: ConnectConfig): void;
    loadModule(moduleName: any): any;
}
export default BaseConnect;
