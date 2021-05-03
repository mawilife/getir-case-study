import express from "express";
import "reflect-metadata";
import { CommonConfig } from "./config";
import { RecordController } from "./controllers/record.controller";
import codes from "./objects/codes";
import messages from "./objects/messages";
import IDBConnection from "./repo/idbconnection";
import IRecordRepo from "./repo/irecord.repo";
import * as swaggerDocument from "./swagger.json"
import swaggerUi from "swagger-ui-express"

//Dependency injection (it can move to di container)
import MongoConnection from "./repo/mongo/mongoconnection";
import { RecordRepo } from "./repo/mongo/records/record.repo";
const dbConnection: IDBConnection = new MongoConnection();
const recordRepo: IRecordRepo = new RecordRepo()
//end of di

const app = express();

app.use(express.json());

dbConnection.connect();

const recordController = new RecordController(recordRepo);

app.post("/", async (req, res) => {
    try {
        const result = await recordController.filterByDateAndCount(req.body);
        res.status(200).json({
            code: result.code,
            msg: result.msg,
            records: result.data,
        });
    } catch (error) {
        res.status(500).json({
            code: codes.unknown,
            msg: messages.unknown,
            records: [],
        });
        console.log(error);
    }
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const server = app.listen(CommonConfig.port, '0.0.0.0', () => {
    console.log(`Api started on port: ${CommonConfig.port}`)
});

export default app;
export const dbcon = dbConnection;