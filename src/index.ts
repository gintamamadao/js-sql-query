import Builder from "./builder/builder";
import Execute from "./execute/execute";
import { Type } from "schema-verify";
import { ConnectConfig } from "./constant/execute/interface";

function SqlQuery(config: ConnectConfig) {
    config = Type.object.safe(config);
    const execute = new Execute(config);
    const o = new Builder(config.dialect, execute);
    return o;
}

SqlQuery.Builder = Builder;

export default SqlQuery;
