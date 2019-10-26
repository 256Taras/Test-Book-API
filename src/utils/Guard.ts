// Inspiration from stemmlerjs/white-label/blob/master/src/core/logic/Guard.ts

export interface IGuardArgument {
    argument: any;
    argumentName: string;
}

export interface IGuardResult {
    isSuccess: boolean;
    errorMessage: string;
    failedOn: string;
}

export type GuardArgumentCollection = IGuardArgument[]

export class Guard {
    public static isNotNullOrUndefined(argument: any, argumentName: string): IGuardResult {
        if (argument === null || argument === undefined) {
            return { isSuccess: false, errorMessage: `${argumentName} is null or undefined`, failedOn: argumentName };
        } else {
            return { isSuccess: true, errorMessage: '', failedOn: '' };
        }
    }

    public static noneAreNullOrUndefined(args: GuardArgumentCollection): IGuardResult {
        for (const { argument, argumentName } of args) {
            const result = this.isNotNullOrUndefined(argument, argumentName);
            if (!result.isSuccess) return result;
        }

        return { isSuccess: true, errorMessage: '', failedOn: '' };
    }
}