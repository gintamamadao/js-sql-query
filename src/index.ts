import Builder from "./builder/builder";

function SqlQuery() {
    const o = new Builder();
    return o;
}

SqlQuery.Builder = Builder;

export default SqlQuery;
