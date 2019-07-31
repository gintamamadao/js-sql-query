import { Schema } from "schema-verify";
import { DialectTypes } from "../../constant/builder/enum";

const conConfigSchema = new Schema({
    type: Object,
    props: [
        {
            index: "host",
            required: true,
            type: String,
            minLength: 1
        },
        [
            {
                index: "port",
                type: String
            },
            {
                type: Number
            }
        ],
        {
            index: "user",
            required: true,
            type: String,
            minLength: 1
        },
        {
            index: "password",
            type: String,
            minLength: 1
        },
        {
            index: "database",
            required: true,
            type: String,
            minLength: 1
        },
        {
            index: "dialect",
            type: String,
            enum: DialectTypes
        },
        {
            index: "connectionLimit",
            type: Number,
            natural: true
        }
    ]
});

export const conConfigVerify = conConfigSchema.verify;
