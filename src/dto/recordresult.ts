import codes from "../objects/codes";
import messages from "../objects/messages";
import IRecord from "./irecord";

export class RecordResult {
    constructor(public code: number, public msg: string, public records: IRecord[]) { }
}

export class SuccessRecordResult extends RecordResult {
    constructor(records: IRecord[]) {
        super(codes.success, messages.success, records);
    }
}

export class ErrorRecordResult extends RecordResult {
    constructor(code: number, msg: string) {
        super(code, msg, []);
    }
}
