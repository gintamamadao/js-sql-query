const { Builder } = require("../../dist/js-sql-query");

describe("CREATE", () => {
    const builder = new Builder();
    test("groupBy", () => {
        const info = {
            tableName: "t_anomaly_banner_info",
            primaryKey: "Fanomal_id",
            uniqueKey: {
                index: "Fpage_sign",
                combineFields: ["Fpage_sign"]
            },
            engine: "InnoDB",
            autoIncrement: 10000,
            defaultCharset: "utf8",
            comment: "页面的不规则banner信息",
            fields: [
                {
                    field: "Fanomal_id",
                    type: "bigint",
                    length: 20,
                    unsigned: true,
                    autoIncrement: true,
                    notNull: true,
                    default: "0",
                    onUpdate: true,
                    comment: "页面标志",
                    decimalParam: [1, 2]
                },
                {
                    field: "Fpage_sign",
                    type: "varchar",
                    length: 32,
                    unsigned: true,
                    autoIncrement: true,
                    notNull: true,
                    default: "0",
                    onUpdate: true,
                    comment: "页面标志",
                    decimalParam: [1, 2]
                }
            ]
        };
        // expect(() => builder.create().info(info)).toThrowError(
        //     "错误的字段，需要非空字符串或非空字符串数组"
        // );
    });
});
