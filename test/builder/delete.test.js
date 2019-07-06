const { Builder } = require("../../dist/js-sql-query");

describe("DELETE", () => {
    const builder = new Builder();
    test("*", () => {
        const QUERY = "DELETE FROM `table1`";
        expect((() => builder.delete().table("table1").query)()).toBe(QUERY);
        expect((() => builder.table("table1").delete().query)()).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "DELETE FROM `table1` LIMIT 100";
        expect(
            (() =>
                builder
                    .delete()
                    .table("table1")
                    .step(100).query)()
        ).toBe(QUERY);
    });
    test("ORDER BY", () => {
        const QUERY = "DELETE FROM `table1` ORDER BY `field1` DESC LIMIT 100";
        expect(
            (() =>
                builder
                    .delete()
                    .table("table1")
                    .step(100)
                    .descBy("field1").query)()
        ).toBe(QUERY);
    });
    test("WHERE", () => {
        const QUERY = "DELETE FROM `table1` WHERE `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .delete()
                    .table("table1")
                    .where$Equal({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
});
