import Schema from "schema-verify";
import { FuncTypes } from "../../constant/enum";

const funcInfoSchema = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "funcFeild",
            required: true,
            type: String
        }
    ]
});

const funcInputSchema = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            type: String,
            index: "func",
            required: true,
            custom: value => {
                return !!FuncTypes[value];
            }
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
});

export const funcInfoVerify = funcInfoSchema.verify;
export const funcInputVerify = funcInputSchema.verify;
