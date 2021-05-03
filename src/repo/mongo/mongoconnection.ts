import mongoose from "mongoose";
import { DBConfig } from "../../config";
import IDBConnection from "../idbconnection";

export default class MongoConnection implements IDBConnection {
    connect() {
        mongoose.connect(DBConfig.connectionString, { useNewUrlParser: true });
    }

    end() {
        mongoose.connection.close();
    }
}