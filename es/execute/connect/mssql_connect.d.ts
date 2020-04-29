import { ConnectConfig, DbConnect } from "../../constant/interface";
import BaseConnect from "./base_connect";
declare class MyssqlConnect extends BaseConnect {
    constructor(config: ConnectConfig);
    getPool(): any;
    getDbConnect(): Promise<DbConnect>;
}
export default MyssqlConnect;
