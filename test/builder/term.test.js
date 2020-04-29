const { Builder } = require("../../es/js-sql-query")

describe("SELECT:TERM", () => {
    const builder = new Builder();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` = 'value1'";
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
    });
    test("<>", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` <> 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where(() =>
                        builder.term.notEqual({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.in({
                            field1: ["value1", "value2"]
                        })
                    )
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
                    .where(() =>
                        builder.term.notIn({
                            field1: ["value1", "value2"]
                        })
                    )
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
                    .where(() =>
                        builder.term.more({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.less({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.moreEqual({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.lessEqual({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.like({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.notLike({
                            field1: "value1"
                        })
                    )
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
                    .where(() =>
                        builder.term.between({
                            field1: ["value1", "value2"]
                        })
                    )
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
                    .where(() =>
                        builder.term.notBetween({
                            field1: ["value1", "value2"]
                        })
                    )
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
                    .where(() =>
                        builder.term.equal({
                            field1: "value1",
                            field2: "value2"
                        })
                    )
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where(() =>
                        builder.term
                            .equal({
                                field1: "value1"
                            })
                            .equal({
                                field2: "value2"
                            })
                    )
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
                    .where(() =>
                        builder.term
                            .equal({
                                field1: "value1"
                            })
                            .notEqual({
                                field2: "value2"
                            })
                    )
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
                    .where(() =>
                        builder.term
                            .notEqual({
                                field1: "value1"
                            })
                            .notEqual({
                                field1: "value2"
                            })
                    )
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
                    .where(() =>
                        builder.term.orEqual({
                            field1: "value1",
                            field2: "value2"
                        })
                    )
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where(() =>
                        builder.term
                            .orEqual({
                                field1: "value1"
                            })
                            .orEqual({
                                field2: "value2"
                            })
                    )
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
                    .where(() =>
                        builder.term
                            .orEqual({
                                field1: "value1",
                                field2: "value2"
                            })
                            .bracket()
                            .orEqual({
                                field3: "value3"
                            })
                    )
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
                    .where(() =>
                        builder.term
                            .equal({
                                field1: "value1",
                                field2: "value2"
                            })
                            .orBracket()
                            .equal({
                                field3: "value3"
                            })
                    )
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
                    .where(() =>
                        builder.term
                            .equal({
                                field1: "value1",
                                field2: "value2"
                            })
                            .orBracket()
                            .in({
                                field3: ["value3", "value4"]
                            })
                    )
                    .build())()
        ).toBe(QUERY);
    });
});
