import codes from "../objects/codes";
import messages from "../objects/messages";

export class Result<T>{
    constructor(public code: number, public msg: string, public isSuccess: boolean, public data?: T){}
}

export class ErrorResult extends Result<any>{
    constructor(code: number, msg: string){
        super(code, msg, false);
    }
}

export class SuccessResult<T> extends Result<T>{
    constructor(data: T){
        super(codes.success, messages.success, true, data);
    }
}