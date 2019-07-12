import { Schema } from "schema-verify";

export const groupByVerify = new Schema({
    type: Array,
    elements: {
        type: String,
        required: true
    }
}).verify;

export const funcInfoVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "funcFeild",
            required: true,
            type: String
        }
    ]
}).verify;

export const funcInputVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            type: String,
            index: "func",
            required: true
        },
        [
            {
                index: "field",
                required: true,
                type: String
            },
            {
                type: Number
            }
        ]
    ]
}).verify;
