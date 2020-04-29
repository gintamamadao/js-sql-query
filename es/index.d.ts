import Builder from "./builder/builder";
import Execute from "./execute/execute";
import { ConnectConfig } from "./constant/interface";
import { DialectTypes } from "./constant/enum";
declare function SqlQuery(config: ConnectConfig | DialectTypes): Builder;
export { Builder, Execute };
export default SqlQuery;
