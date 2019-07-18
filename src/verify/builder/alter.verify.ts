import { Schema } from "schema-verify";
import { AlterMethods } from "../../constant/enum";

const alterFieldSchema = new Schema({
    type: Object,
    props: [
        {
            index: "field",
            type: String,
            minLength: 1
        },
        {
            index: "type",
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

const alterInfosSchema = new Schema({
    type: Object,
    props: [
        {
            index: "method",
            required: true,
            type: String,
            enum: AlterMethods
        },
        {
            index: "field",
            required: true,
            type: String,
            minLength: 1
        },
        {
            index: "alterField",
            required: true,
            schema: alterFieldSchema
        }
    ]
});

export const alterFieldVerify = alterFieldSchema.verify;
export const alterInfosVerify = alterInfosSchema.verify;
