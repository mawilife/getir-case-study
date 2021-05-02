import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ErrorResult } from "../dto/result";
import codes from "../objects/codes";
import messages from "../objects/messages";

export function ModelValidator<T>(cls: ClassConstructor<T>) {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const orig = descriptor.value;
        descriptor.value = async function (...args: any[]): Promise<any> {
            if(args.length === 0){
                return new ErrorResult(codes.validation, messages.validation);
            }
            const model: any = plainToClass(cls, args[0]);
            const errors = await validate(model);
            if(errors.length === 0){
                return orig.apply(this, [model]);
            } else {
                return new ErrorResult(codes.validation, messages.validation);
            }
        }
        return descriptor;
    };
}
