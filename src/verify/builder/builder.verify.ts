import Schema from "schema-verify";

export const strArrVerify = new Schema({
    type: Array,
    elements: {
        type: String,
        required: true,
        minLength: 1
    }
}).verify;

export const strObjVerify = new Schema({
    type: Object,
    props: {
        type: String,
        required: true,
        minLength: 1
    }
}).verify;

export const naturalVerify = new Schema({
    type: Number,
    natural: true
}).verify;

export const integerVerify = new Schema({
    type: Number,
    integer: true
}).verify;

export const fieldDataVerify = new Schema({
    type: Object,
    props: [
        [
            {
                required: true,
                type: String
            },
            {
                type: Number
            }
        ]
    ]
}).verify;
