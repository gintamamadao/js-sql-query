import { ConnectConfig } from "./src/constant/interface";
import { DialectTypes } from "./src/constant/enum";
import Builder from "./src/builder/builder";

declare function SqlQuery(config: ConnectConfig | DialectTypes): Builder;
