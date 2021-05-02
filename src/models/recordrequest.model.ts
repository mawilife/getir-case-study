import {Type} from "class-transformer";
import { IsDate, IsEmail, isNumber, IsString, Min } from "class-validator";
export default class RecordRequestModel{
    constructor(startDate: Date, endDate: Date, minCount: number, maxCount: number){
        this.startDate = startDate;
        this.endDate = endDate;
        this.minCount = minCount;
        this.maxCount = maxCount;
    }
    @Type(()=> Date)
    @IsDate()
    public startDate: Date;

    @Type(()=> Date)
    @IsDate()
    public endDate: Date

    @Type(()=> Number)
    @Min(0)
    public minCount: number
    
    @Type(()=> Number)
    @Min(0)
    public maxCount: number
}