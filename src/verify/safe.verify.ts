import { Schema } from "schema-verify";

export const dialectVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "safeKey",
            required: true,
            type: Function
        },
        {
            index: "safeValue",
            required: true,
            type: Function
        }
    ]
}).verify;

export const manualSqlVerify = new Schema([
    {
        type: String,
        length: { min: 1 }
    },
    {
        type: Function
    },
    {
        type: Object
    }
]).verify;
