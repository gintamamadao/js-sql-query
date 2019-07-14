const { Builder } = require("../../dist/js-sql-query");

describe("SELECT", () => {
    const builder = new Builder();
    test("*", () => {
        const QUERY = "SELECT * FROM `table1`";
        expect((() => builder.select().table("table1").query)()).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("*").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .table("table1")
                    .select()
                    .fields("*").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields("*").query)()
        ).toBe(QUERY);
    });
    test("fields", () => {
        const QUERY = "SELECT `field1`, `field2` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1", "field2").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields("field2").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields(["field1", "field2"]).query)()
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
                    .groupBy("field2").query)()
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
                    .groupBy("field2", "field3").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .count("field2")
                    .groupBy("field2")
                    .groupBy("field3").query)()
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
                    .count("field2").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields(builder.func.count("field2")).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .fields({ func: "count", field: "field2" }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds(builder.func.count("field2")).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1")
                    .funcFeilds({ func: "count", field: "field2" }).query)()
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
                    .sum("field3").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .fields("field1", builder.func.count("field2"), {
                        func: "sum",
                        field: "field3"
                    }).query)()
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
                    ).query)()
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
                    }).query)()
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
                    }).query)()
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
                    }).query)()
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
                    }).query)()
        ).toBe(QUERY);
    });
});

describe("SELECT:ERROR", () => {
    const builder = new Builder();
    test("table", () => {
        expect(() => builder.table().select()).toThrowError(
            "错误的表名，需要非空字符串"
        );
    });
    test("groupBy", () => {
        expect(
            () =>
                builder
                    .select()
                    .table("table1")
                    .groupBy().query
        ).toThrowError("错误的字段，需要非空字符串或非空字符串数组");
    });
    test("groupBy", () => {
        expect(
            () =>
                builder
                    .select()
                    .table("table1")
                    .groupBy({}).query
        ).toThrowError("错误的字段，需要非空字符串或非空字符串数组");
    });
});
