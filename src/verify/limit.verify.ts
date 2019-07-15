import { Schema } from "schema-verify";

export const pageVerify = new Schema({
    type: Number,
    integer: true,
    min: 1
}).verify;

export const limitInfoVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            type: Number,
            index: "offset",
            integer: true,
            required: true
        },
        {
            type: Number,
            index: "step",
            integer: true,
            required: true
        }
    ]
}).verify;
