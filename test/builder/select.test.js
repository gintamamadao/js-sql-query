const sqlQuery = require("../../lib/js-sql-query")

describe("SELECT: base", () => {
    const builder = new sqlQuery();
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
    const builder = new sqlQuery();
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
});

describe("SELECT: asMap", () => {
    const builder = new sqlQuery();
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
});

describe("SELECT: multiTables", () => {
    const builder = new sqlQuery();
    test("multiTables", () => {
        const QUERY = "SELECT * FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .multiTables("table1")
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

describe("SELECT: tableFields", () => {
    const builder = new sqlQuery();
    test("tableFields", () => {
        const QUERY =
            "SELECT `table1`.`field1`, `table1`.`field2` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .tableFields({
                        table1: ["field1", "field2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("tableFields", () => {
        const QUERY =
            "SELECT `table1`.`field1`, `table1`.`field2`, `table2`.`field3` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .tableFields({
                        table1: ["field1", "field2"],
                        table2: ["field3"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
});

describe("SELECT: tableAsMap", () => {
    const builder = new sqlQuery();
    test("tableAsMap", () => {
        const QUERY =
            "SELECT `table1`.`field1` AS `field1_as`, `table1`.`field2` AS `field2_as` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .tableFields({
                        table1: ["field1", "field2"]
                    })
                    .tableAsMap({
                        table1: {
                            field1: "field1_as",
                            field2: "field2_as"
                        }
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("tableAsMap", () => {
        const QUERY =
            "SELECT `table1`.`field1` AS `field1_as`, `table1`.`field2` AS `field2_as`, `table2`.`field3` AS `field3_as` FROM `table1`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .tableFields({
                        table1: ["field1", "field2"],
                        table2: ["field3"]
                    })
                    .tableAsMap({
                        table1: {
                            field1: "field1_as",
                            field2: "field2_as"
                        },
                        table2: {
                            field3: "field3_as"
                        }
                    })
                    .build())()
        ).toBe(QUERY);
    });
});

describe("SELECT: join", () => {
    const builder = new sqlQuery();
    test("innerJoin", () => {
        const QUERY =
            "SELECT * FROM `table1` INNER JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`)";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .innerJoin({
                        tableName: "table2",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table2: "field2"
                                }
                            }
                        ]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("leftJoin", () => {
        const QUERY =
            "SELECT * FROM `table1` LEFT JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`)";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .leftJoin({
                        tableName: "table2",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table2: "field2"
                                }
                            }
                        ]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("rightJoin", () => {
        const QUERY =
            "SELECT * FROM `table1` RIGHT JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`)";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .rightJoin({
                        tableName: "table2",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table2: "field2"
                                }
                            }
                        ]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("innerJoin mutil join", () => {
        const QUERY =
            "SELECT * FROM `table1` INNER JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`) INNER JOIN `table3` ON (`table1`.`field1` = `table3`.`field3`)";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .innerJoin({
                        tableName: "table2",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table2: "field2"
                                }
                            }
                        ]
                    })
                    .innerJoin({
                        tableName: "table3",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table3: "field3"
                                }
                            }
                        ]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("innerJoin mutil term", () => {
        const QUERY =
            "SELECT * FROM `table1` INNER JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`) AND (`table1`.`field3` = `table2`.`field4`)";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .innerJoin({
                        tableName: "table2",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table2: "field2"
                                }
                            },
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field3",
                                    table2: "field4"
                                }
                            }
                        ]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("innerJoin", () => {
        const QUERY =
            "SELECT `table1`.`field1` AS `field1_as`, `table1`.`field2` AS `field2_as` FROM `table1` INNER JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`)";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .tableFields({
                        table1: ["field1", "field2"]
                    })
                    .tableAsMap({
                        table1: {
                            field1: "field1_as",
                            field2: "field2_as"
                        }
                    })
                    .innerJoin({
                        tableName: "table2",
                        termInfos: [
                            {
                                symbol: "=",
                                tableFields: {
                                    table1: "field1",
                                    table2: "field2"
                                }
                            }
                        ]
                    })
                    .build())()
        ).toBe(QUERY);
    });
});
