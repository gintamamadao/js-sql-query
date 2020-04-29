const { Builder } = require("../../lib/js-sql-query")

describe("INSERT", () => {
    const builder = new Builder();
    test("*", () => {
        const QUERY =
            "INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .insert()
                    .table("table1")
                    .data({
                        field1: "value1",
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .table("table1")
                    .insert()
                    .data({
                        field1: "value1",
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .insert()
                    .table("table1")
                    .fields("field1", "field2")
                    .data({
                        field1: "value1",
                        field2: "value2",
                        field3: "value3"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .insert()
                    .table("table1")
                    .fields(["field1", "field2"])
                    .data({
                        field1: "value1",
                        field2: "value2",
                        field3: "value3"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("VALUES", () => {
        const QUERY =
            "INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' ), ( 'value4', 'value5' )";
        expect(
            (() =>
                builder
                    .insert()
                    .table("table1")
                    .fields(["field1", "field2"])
                    .multiData([
                        {
                            field1: "value1",
                            field2: "value2",
                            field3: "value3"
                        },
                        {
                            field1: "value4",
                            field2: "value5",
                            field3: "value6"
                        }
                    ])
                    .build())()
        ).toBe(QUERY);
    });
    test("VALUES", () => {
        const QUERY =
            "INSERT INTO `table1` ( `field1`, `field2` )  VALUES SELECT `field1`, `field2` FROM `table1`";
        expect(
            (() =>
                builder
                    .insert()
                    .table("table1")
                    .fields(["field1", "field2"])
                    .values(() =>
                        builder
                            .select()
                            .table("table1")
                            .fields(["field1", "field2"])
                    )
                    .build())()
        ).toBe(QUERY);
    });
});
