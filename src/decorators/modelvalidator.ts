import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ErrorResult } from "../dto/result";
import codes from "../objects/codes";
import messages from "../objects/messages";

/**
 * transforms and validates parameter of a function
 * @param modelType type of parameter value
 * @returns on success returns original function result, on error return validation ErrorResult  
 */
export function ModelValidator<T>(modelType: ClassConstructor<T>) {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const orig = descriptor.value;
        descriptor.value = async function (...args: any[]): Promise<any> { // standart function decorator defination
            if (args.length === 0) { // if function called with no parameters 
                return new ErrorResult(codes.validation, messages.validation);
            }
            // transforms plain object which sent function as first parameter to model instance
            const model: any = plainToClass(modelType, args[0]);
            // validates model instace
            const errors = await validate(model);
            if (errors.length === 0) { // if error count equels to zero it means success
                return orig.apply(this, [model]);
            } else { // if there is any error returns error result
                return new ErrorResult(codes.validation, messages.validation);
            }
        }
        return descriptor;
    };
}
