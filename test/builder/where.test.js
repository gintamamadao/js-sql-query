const { Builder } = require("../../lib/js-sql-query")

describe("SELECT:WHERE", () => {
    const builder = new Builder();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where(() =>
                        builder.term.equal({
                            field1: "value1"
                        })
                    )
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where(
                        builder.term.equal({
                            field1: "value1"
                        })
                    )
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where(() => "`field1` = 'value1'")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where("`field1` = 'value1'")
                    .build())()
        ).toBe(QUERY);
    });
    test("<>", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` <> 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereNotEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("IN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereIn({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("NOT IN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereNotIn({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test(">", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` > 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereMore({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("<", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` < 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereLess({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test(">=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` >= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereMoreEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("<=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` <= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereLessEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("LIKE", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereLike({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("NOT LIKE", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereNotLike({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereBetween({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("NOT BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereNotBetween({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereEqual({
                        field1: "value1"
                    })
                    .whereEqual({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereEqual({
                        field1: "value1"
                    })
                    .whereNotEqual({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereNotEqual({
                        field1: "value1"
                    })
                    .whereNotEqual({
                        field1: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("OR", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereOrEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereOrEqual({
                        field1: "value1"
                    })
                    .whereOrEqual({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("Bracket", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereOrEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .whereBracket()
                    .whereOrEqual({
                        field3: "value3"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .whereOrBracket()
                    .whereEqual({
                        field3: "value3"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .whereEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .whereOrBracket()
                    .whereIn({
                        field3: ["value3", "value4"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
});
