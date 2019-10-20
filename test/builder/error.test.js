const { Builder } = require("../../dist/js-sql-query");

describe("ERROR:builder", () => {
    const builder = new Builder();
    test("table", () => {
        expect(() => builder.table()).toThrowError(
            "错误的表名，需要非空字符串"
        );
    });
    test("table", () => {
        expect(() => builder.build()).toThrowError("未选择sql类型");
    });
    test("table", () => {
        expect(() => builder.build()).toThrowError("未选择sql类型");
    });
});

describe("ERROR:select", () => {
    const builder = new Builder();
    test("table", () => {
        expect(() => builder.select().build()).toThrowError(
            "错误的表名，需要非空字符串"
        );
    });
    test("groupBy", () => {
        expect(() =>
            builder
                .select()
                .table("table1")
                .groupBy()
                .build()
        ).toThrowError("错误的字段，需要非空字符串或非空字符串数组");
    });
});
