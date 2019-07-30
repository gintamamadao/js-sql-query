import Builder from "./builder/builder";

function SqlQuery() {
    this.builder = new Builder();
    return this;
}

SqlQuery.Builder = Builder;

export default SqlQuery;
