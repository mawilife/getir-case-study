import { Schema } from "mongoose";

const RecordSchema = new Schema({
    key: String,
    createdAt: Date,
    counts: {
        type: Array,
        of: Number
    }
});

export default RecordSchema;