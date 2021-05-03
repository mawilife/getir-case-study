
import { ModelValidator } from "../decorators/modelvalidator";
import IRecord from "../dto/irecord";
import { Result } from "../dto/result";
import RecordRequestModel from "../models/recordrequest.model";
import IRecordRepo from "../repo/irecord.repo";

export class RecordController {
    constructor(private readonly recordRepo: IRecordRepo) { }

    @ModelValidator(RecordRequestModel)
    async filterByDateAndCount(model: RecordRequestModel): Promise<Result<IRecord[]>> {
        const result = await this.recordRepo.filterByDateAndCount(model.startDate, model.endDate, model.minCount, model.maxCount);
        return result;
    }
}