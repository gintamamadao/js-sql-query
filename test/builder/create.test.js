const { Builder } = require("../../es");

describe("CREATE", () => {
    const builder = new Builder();
    const tableInfo = {
        tableName: "student",
        primaryKey: "id",
        uniqueKey: "name",
        engine: "InnoDB",
        autoIncrement: 10000,
        defaultCharset: "utf8",
        comment: "学生信息表",
        fields: [
            {
                field: "id",
                type: "bigint",
                unsigned: true,
                notNull: true,
                autoIncrement: true,
                comment: "学生id"
            },
            {
                field: "name",
                type: "varchar(32)",
                default: "",
                notNull: true,
                comment: "学生名字"
            },
            {
                field: "update_time",
                type: "timestamp",
                notNull: true,
                default: "CURRENT_TIMESTAMP",
                onUpdate: "CURRENT_TIMESTAMP",
                comment: "最后更新时间"
            }
        ]
    };
    test("CREATE:base", () => {
        const info = JSON.parse(JSON.stringify(tableInfo));
        const QUERY =
            "CREATE TABLE IF NOT EXISTS student ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id',`name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '学生名字',`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',CONSTRAINT `id` PRIMARY KEY (`id`),CONSTRAINT `name` UNIQUE KEY (`name`) ) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='学生信息表';";
        expect(
            (() =>
                builder
                    .create()
                    .info(info)
                    .build())()
        ).toBe(QUERY);
    });
    test("CREATE:primaryKey", () => {
        const info = JSON.parse(JSON.stringify(tableInfo));
        info.primaryKey = {
            keyName: "pk_id",
            combineFields: ["id", "name"]
        };
        const QUERY =
            "CREATE TABLE IF NOT EXISTS student ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id',`name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '学生名字',`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',CONSTRAINT `pk_id` PRIMARY KEY (`id`,`name`),CONSTRAINT `name` UNIQUE KEY (`name`) ) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='学生信息表';";
        expect(
            (() =>
                builder
                    .create()
                    .info(info)
                    .build())()
        ).toBe(QUERY);
    });
    test("CREATE:primaryKey", () => {
        const info = JSON.parse(JSON.stringify(tableInfo));
        info.uniqueKey = {
            keyName: "pk_id",
            combineFields: ["id", "name"]
        };
        const QUERY =
            "CREATE TABLE IF NOT EXISTS student ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id',`name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '学生名字',`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',CONSTRAINT `id` PRIMARY KEY (`id`),CONSTRAINT `pk_id` UNIQUE KEY (`id`,`name`) ) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='学生信息表';";
        expect(
            (() =>
                builder
                    .create()
                    .info(info)
                    .build())()
        ).toBe(QUERY);
    });
    test("CREATE:DATABASE", () => {
        const QUERY = "CREATE DATABASE database1";
        expect(
            (() =>
                builder
                    .create()
                    .dataBase("database1")
                    .build())()
        ).toBe(QUERY);
    });
    test("CREATE:error", () => {
        const info = JSON.parse(JSON.stringify(tableInfo));
        info.tableName = 0;
        expect(() =>
            builder
                .create()
                .info(info)
                .build()
        ).toThrowError(
            "属性 tableName: type 校验不通过, 错误信息：需要 string 类型"
        );
    });
});
