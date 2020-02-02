import Schema from "schema-verify";

export const pageSchema = new Schema({
    type: Number,
    integer: true,
    min: 1
});

export const limitInfoSchema = new Schema({
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
});

export const pageVerify = pageSchema.verify;
export const limitInfoVerify = limitInfoSchema.verify;
