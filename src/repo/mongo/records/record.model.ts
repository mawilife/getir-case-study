import mongoose from "mongoose";
import IRecordDocument from "./record.document";
import RecordSchema from "./record.schema"

export default mongoose.model<IRecordDocument>("records", RecordSchema); //model cration for table records