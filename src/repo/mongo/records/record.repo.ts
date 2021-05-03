import IRecord from "../../../dto/irecord";
import { ErrorResult, Result, SuccessResult } from "../../../dto/result";
import codes from "../../../objects/codes";
import messages from "../../../objects/messages";
import IRecordRepo from "../../irecord.repo";
import RecordModel from "./record.model";

export class RecordRepo implements IRecordRepo {
    async filterByDateAndCount(startDate: Date, endDate: Date, minCount: number, maxCount: number): Promise<Result<IRecord[]>> {
        try {
            const result = await RecordModel.aggregate([
                { "$match": { createdAt: { $gt: startDate, $lt: endDate } } },
                {
                    "$addFields": {
                        "totalCount": {
                            "$reduce": {
                                "input": "$counts",
                                "initialValue": 0,
                                "in": { "$add": ["$$value", "$$this"] }
                            }
                        }
                    }
                },
                { "$match": { totalCount: { $gt: minCount, $lt: maxCount } } },
                { "$project": { "_id": 0, key: 1, createdAt: 1, totalCount: 1 } },
            ]);
            return new SuccessResult(result);
        } catch (error) {
            return new ErrorResult(codes.dbError, error.message || messages.unknown);
        }
    }

}