import  IRecord from "../../../dto/irecord" ;
import { Document } from "mongoose";

export default interface IRecordDocument extends Document, IRecord {};