import mongoose from "mongoose";
import { DBConfig } from "../../config";
import IDBConnection from "../idbconnection";

export default class MongoConnection implements IDBConnection{
    async connect() {
        mongoose.connect(DBConfig.connectionString, { useNewUrlParser: true});
    }
}