const { Builder } = require("../../dist/js-sql-query");

describe("SELECT:TERM", () => {
    const builder = new Builder();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
});
