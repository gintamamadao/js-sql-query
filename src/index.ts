import Builder from "./builder/builder";
import Execute from "./execute/execute";
import { Type } from "schema-verify";
import { ConnectConfig } from "./constant/interface";
import { DialectTypes } from "./constant/enum";

function SqlQuery(config: ConnectConfig | DialectTypes) {
    let dialect: DialectTypes;
    if (Type.object.isNot(config)) {
        dialect = DialectTypes.mysql;
        if (Type.string.isNotEmpty(config)) {
            dialect = <DialectTypes>config;
        }
        return new Builder(dialect);
    }
    dialect = (<ConnectConfig>config).dialect || DialectTypes.mysql;
    config = Type.object.safe(config);
    const execute = new Execute(<ConnectConfig>config);
    const builder = new Builder(dialect, execute);
    return builder;
}

SqlQuery.Builder = Builder;
SqlQuery.Execute = Execute;

export default SqlQuery;
