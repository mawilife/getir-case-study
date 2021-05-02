import IRecord from "../dto/irecord";
import { Result } from "../dto/result";

export default interface IRecordRepo{
    filterByDateAndCount(startDate: Date, endDate: Date, minCount: number, maxCount: number): Promise<Result<IRecord[]>>;
}