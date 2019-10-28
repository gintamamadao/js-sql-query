const { Builder } = require("../../dist/js-sql-query");

describe("SELECT", () => {
    const builder = new Builder();
    test("*", () => {
        const QUERY = "SELECT * FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("*")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .table("table1")
                    .select()
                    .fields("*")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields("*")
                    .build())()
        ).toBe(QUERY);
    });
    test("fields", () => {
        const QUERY = "SELECT `field1`, `field2` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1", "field2")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields("field2")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields(["field1", "field2"])
                    .build())()
        ).toBe(QUERY);
    });
    test("GROUP BY", () => {
        const QUERY =
            "SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .groupBy("field2")
                    .build())()
        ).toBe(QUERY);
    });
    test("GROUP BY", () => {
        const QUERY =
            "SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`, `field3`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .groupBy("field2", "field3")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .groupBy("field2")
                    .groupBy("field3")
                    .build())()
        ).toBe(QUERY);
    });
});

describe("SELECT:COMBINE FUNC", () => {
    const builder = new Builder();
    test("COUNT", () => {
        const QUERY = "SELECT `field1`, COUNT(`field2`) FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields(builder.func.count("field2"))
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields({ func: "count", field: "field2" })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds(builder.func.count("field2"))
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds({ func: "count", field: "field2" })
                    .build())()
        ).toBe(QUERY);
    });
    test("SUM", () => {
        const QUERY =
            "SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .sum("field3")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1", builder.func.count("field2"), {
                        func: "sum",
                        field: "field3"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds(
                        { func: "count", field: "field2" },
                        { func: "sum", field: "field3" }
                    )
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds(builder.func.count("field2"), {
                        func: "sum",
                        field: "field3"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds(builder.func.count("field2"))
                    .funcFeilds({
                        func: "sum",
                        field: "field3"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .funcFeilds({
                        func: "sum",
                        field: "field3"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields(builder.func.count("field2"))
                    .funcFeilds({
                        func: "sum",
                        field: "field3"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("fieldAsMap", () => {
        const QUERY = "SELECT `field1` AS `field1_as` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .asMap({
                        field1: "field1_as"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("fieldAsMap", () => {
        const QUERY =
            "SELECT `field1` AS `field1_as`, `field2` AS `field2_as` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1", "field2")
                    .asMap({
                        field1: "field1_as",
                        field2: "field2_as"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("multiTables", () => {
        const QUERY = "SELECT * FROM `table1`, `table2`";
        expect(
            (() =>
                builder
                    .select()
                    .multiTables("table1", "table2")
                    .build())()
        ).toBe(QUERY);
    });
});
