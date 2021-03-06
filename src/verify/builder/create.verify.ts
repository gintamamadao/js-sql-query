import Schema from "schema-verify";

const tableFieldSchema = new Schema({
    type: Object,
    props: [
        {
            index: "field",
            required: true,
            type: String,
            minLength: 1
        },
        {
            index: "type",
            required: true,
            type: String,
            minLength: 1
        },
        {
            index: "unsigned",
            type: Boolean
        },
        {
            index: "autoIncrement",
            type: Boolean
        },
        {
            index: "notNull",
            type: Boolean
        },
        [
            {
                index: "default",
                type: String
            },
            {
                type: Number
            }
        ],
        {
            index: "onUpdate",
            type: String
        },
        {
            index: "comment",
            type: String
        }
    ]
});

const combineKeySchema = new Schema({
    type: Object,
    props: [
        {
            index: "keyName",
            required: true,
            type: String,
            minLength: 1
        },
        {
            index: "combineFields",
            required: true,
            type: Array,
            minLength: 1,
            elements: {
                type: String,
                minLength: 1
            }
        }
    ]
});

const tableInfoSchema = new Schema({
    type: Object,
    props: [
        {
            index: "tableName",
            required: true,
            type: String,
            minLength: 1
        },
        [
            {
                index: "primaryKey",
                required: true,
                type: String,
                minLength: 1
            },
            combineKeySchema
        ],
        [
            {
                index: "uniqueKey",
                type: String,
                minLength: 1
            },
            combineKeySchema
        ],
        {
            index: "engine",
            type: String
        },
        {
            index: "defaultCharset",
            type: String
        },
        {
            index: "comment",
            type: String
        },
        {
            index: "autoIncrement",
            type: Number
        },
        {
            index: "fields",
            type: Array,
            minLength: 1,
            elements: tableFieldSchema
        }
    ]
});
export const tableFieldVerify = tableFieldSchema.verify;
export const uniqueKeyVerify = combineKeySchema.verify;
export const tableInfoVerify = tableInfoSchema.verify;
