export interface IGuardResult {
    isSuccess: boolean;
}

export class Guard {
    public static isNotNullOrUndefined(argument: any): IGuardResult {
        if (argument === null || argument === undefined) {
            return { isSuccess: true };
        } else {
            return { isSuccess: false };
        }
    }
}