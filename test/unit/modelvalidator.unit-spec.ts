import { Type } from "class-transformer";
import { IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import "reflect-metadata";
import { ModelValidator } from "../../src/decorators/modelvalidator";
import { Result, SuccessResult } from "../../src/dto/result";
import codes from "../../src/objects/codes";
import messages from "../../src/objects/messages";

class TestModel {
    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }

    @Type((() => String))
    @IsString()
    @MinLength(3)
    @MaxLength(5)
    public name: string

    @Type((() => Number))
    @Min(3)
    @Max(5)
    public value: number

}
class TestClass {
    @ModelValidator(TestModel)
    async testFunction(model: TestModel): Promise<Result<TestModel>> {
        return new SuccessResult(model);
    }
}


describe('Model Validator Unit Test', () => {
    describe("Success Case", () => {
        const successObj = { name: "test", value: 4 };
        let res: Result<TestModel>;

        beforeAll(async () => {
            res = await new TestClass().testFunction(successObj);
        });

        it("Should be success", () => {
            expect(res.isSuccess).toBe(true);
            expect(res.code).toBe(codes.success);
            expect(res.msg).toBe(messages.success);
        });

        it("Should not be undefined or null", () => {
            expect(res.data).not.toBeNull();
            expect(res.data).not.toBeUndefined();
        });

        it("Equal properties", () => {
            expect(res.data?.name).toBe(successObj.name);
            expect(res.data?.value).toBe(successObj.value);
        });
    });

    describe("ValidationError Case (empity object)", () => {
        const obj: any = {};
        let res: Result<TestModel>;

        beforeAll(async () => {
            res = await new TestClass().testFunction(obj);
        });

        it("Should be success", () => {
            expect(res.isSuccess).toBe(false);
            expect(res.code).toBe(codes.validation);
            expect(res.msg).toBe(messages.validation);
        });

        it("Should be undefined", () => {
            expect(res.data).toBeUndefined();
        });
    });

    describe("ValidationError Case (short name)", () => {
        const obj: any = { name: "xx", value: 4 };
        let res: Result<TestModel>;

        beforeAll(async () => {
            res = await new TestClass().testFunction(obj);
        });

        it("Should not be success", () => {
            expect(res.isSuccess).toBe(false);
            expect(res.code).toBe(codes.validation);
            expect(res.msg).toBe(messages.validation);
        });

        it("Should be undefined", () => {
            expect(res.data).toBeUndefined();
        });
    });

    describe("ValidationError Case (long name)", () => {
        const obj: any = { name: "xxxxxx", value: 4 };
        let res: Result<TestModel>;

        beforeAll(async () => {
            res = await new TestClass().testFunction(obj);
        });

        it("Should not be success", () => {
            expect(res.isSuccess).toBe(false);
            expect(res.code).toBe(codes.validation);
            expect(res.msg).toBe(messages.validation);
        });

        it("Should be undefined", () => {
            expect(res.data).toBeUndefined();
        });
    });

    describe("ValidationError Case (low value)", () => {
        const obj: any = { name: "xxxx", value: 2 };
        let res: Result<TestModel>;

        beforeAll(async () => {
            res = await new TestClass().testFunction(obj);
        });

        it("Should not be success", () => {
            expect(res.isSuccess).toBe(false);
            expect(res.code).toBe(codes.validation);
            expect(res.msg).toBe(messages.validation);
        });

        it("Should be undefined", () => {
            expect(res.data).toBeUndefined();
        });
    });

    describe("ValidationError Case (high value)", () => {
        const obj: any = { name: "xxxx", value: 6 };
        let res: Result<TestModel>;

        beforeAll(async () => {
            res = await new TestClass().testFunction(obj);
        });

        it("Should not be success", () => {
            expect(res.isSuccess).toBe(false);
            expect(res.code).toBe(codes.validation);
            expect(res.msg).toBe(messages.validation);
        });

        it("Should be undefined", () => {
            expect(res.data).toBeUndefined();
        });
    });

});