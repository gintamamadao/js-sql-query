const { Builder } = require("../../dist/js-sql-query");

describe("LIMIT", () => {
    const builder = new Builder();
    test("OFFSET", () => {
        const QUERY = "SELECT * FROM `table1` OFFSET 1";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .offset(1).query)()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 10";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .step(10).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .paging(1, 10).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(0, 10).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(10).query)()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 10 OFFSET 1";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(1, 10).query)()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 10 OFFSET 10";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .paging(2, 10).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(10, 10).query)()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 1";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .findOne().query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(0, 1).query)()
        ).toBe(QUERY);
    });
});
