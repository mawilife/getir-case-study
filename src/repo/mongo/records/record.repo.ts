import { Model } from "mongoose";
import IRecord from "../../../dto/irecord";
import { ErrorResult, Result, SuccessResult } from "../../../dto/result";
import codes from "../../../objects/codes";
import messages from "../../../objects/messages";
import IRecordRepo from "../../irecord.repo";
import IRecordDocument from "./record.document";

export class RecordRepo implements IRecordRepo {
    constructor(private readonly recordModel: Model<IRecordDocument>) { }

    async filterByDateAndCount(startDate: Date, endDate: Date, minCount: number, maxCount: number): Promise<Result<IRecord[]>> {
        try {
            const result = await this.recordModel.aggregate([
                { "$match": { createdAt: { $gt: startDate, $lt: endDate } } }, //filtering documents with date 
                {
                    "$addFields": { //adding new field named totalCount from sum of counts array items
                        "totalCount": {
                            "$reduce": {
                                "input": "$counts",
                                "initialValue": 0,
                                "in": { "$add": ["$$value", "$$this"] }
                            }
                        }
                    }
                },
                { "$match": { totalCount: { $gt: minCount, $lt: maxCount } } }, // filtering documents in range
                { "$project": { "_id": 0, key: 1, createdAt: 1, totalCount: 1 } }, // removing unnecessary columns
            ]);
            return new SuccessResult(result);
        } catch (error) {
            return new ErrorResult(codes.dbError, error.message || messages.unknown);
        }
    }

}