import { Schema } from "schema-verify";
import { UpdateTypes } from "../constant/enum";

export const updateInfoVerify = new Schema({
    type: Object,
    props: [
        [
            {
                index: "value",
                required: true,
                type: String
            },
            {
                type: Number
            }
        ],
        {
            index: "type",
            required: true,
            type: String,
            enum: UpdateTypes
        }
    ]
}).verify;
