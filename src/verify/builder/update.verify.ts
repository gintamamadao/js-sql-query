import { Schema } from "schema-verify";
import { UpdateTypes } from "../../constant/enum";

const updateInfoSchema = new Schema({
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
});

export const updateInfoVerify = updateInfoSchema.verify;
