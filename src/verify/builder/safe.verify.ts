import Schema from "schema-verify";

export const dialectSchema = new Schema({
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
});

export const manualSqlSchema = new Schema([
    {
        type: String,
        minLength: 1
    },
    {
        type: Function
    },
    {
        type: Object
    }
]);

export const dialectVerify = dialectSchema.verify;
export const manualSqlVerify = manualSqlSchema.verify;
