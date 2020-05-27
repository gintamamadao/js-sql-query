import Builder from "./builder/builder";
import { ConnectConfig } from "./constant/interface";
import { DialectTypes } from "./constant/enum";
declare function sqlQuery(config: ConnectConfig | DialectTypes): Builder;
export default sqlQuery;
