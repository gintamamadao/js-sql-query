import Builder from "./builder/builder";
import { Type } from "schema-verify";
import { ConnectConfig } from "./constant/interface";
import { DialectTypes } from "./constant/enum";

function sqlQuery(config: ConnectConfig | DialectTypes): Builder {
    let dialect: DialectTypes;
    dialect = DialectTypes.mysql;
    if (Type.string.isNotEmpty(config) && DialectTypes[<DialectTypes>config]) {
        dialect = <DialectTypes>config;
    }
    return new Builder(dialect);
}

export default sqlQuery;
