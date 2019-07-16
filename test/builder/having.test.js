const { Builder } = require("../../dist/js-sql-query");

describe("SELECT:HAVING", () => {
    const builder = new Builder();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having(() =>
                        builder.term.equal({
                            field1: "value1"
                        })
                    ).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having(
                        builder.term.equal({
                            field1: "value1"
                        })
                    ).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having(() => "`field1` = 'value1'").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having("`field1` = 'value1'").query)()
        ).toBe(QUERY);
    });
    test("<>", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` <> 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingNotEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("IN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingIn({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test("NOT IN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` NOT IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingNotIn({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test(">", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` > 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingMore({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("<", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` < 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingLess({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test(">=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` >= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingMoreEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("<=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` <= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingLessEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("LIKE", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingLike({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("NOT LIKE", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` NOT LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingNotLike({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingBetween({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test("NOT BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` NOT BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingNotBetween({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingEqual({
                        field1: "value1",
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingEqual({
                        field1: "value1"
                    })
                    .havingEqual({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingEqual({
                        field1: "value1"
                    })
                    .havingNotEqual({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` <> 'value1' AND `field1` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingNotEqual({
                        field1: "value1"
                    })
                    .havingNotEqual({
                        field1: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("OR", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` = 'value1' OR `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingOrEqual({
                        field1: "value1",
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingOrEqual({
                        field1: "value1"
                    })
                    .havingOrEqual({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("Bracket", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingOrEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .havingBracket()
                    .havingOrEqual({
                        field3: "value3"
                    }).query)()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .havingOrBracket()
                    .havingEqual({
                        field3: "value3"
                    }).query)()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .havingEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .havingOrBracket()
                    .havingIn({
                        field3: ["value3", "value4"]
                    }).query)()
        ).toBe(QUERY);
    });
});
