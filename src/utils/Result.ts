type Nullable<T> = T | null;

export enum ResultType {
    Pass,
    Invalid,
    Unauthorized,
    PartialOk,
    NotFound,
    PermissionDenied,
    Unexpected
}

export class Result<T> {
    public _isSuccess: boolean;
    public _isFailure: boolean;
    public _resultType: ResultType;
    public _error: string;
    private _value: T;

    constructor (resultType: ResultType, error?: string, value?: T) {
        if (resultType === ResultType.Pass && error) {
            throw new Error('A result cannot be successful and contain an error');
        }

        if (resultType !== ResultType.Pass && !error) {
            throw new Error('A failing result must contain an error message');
        }

        if (error) this._error = error;
        if (value) this._value = value;

        this._resultType = resultType;
    }

    public get isSuccess() {
        return this._resultType === ResultType.Pass ? true : false;
    }

    public get isFailure() {
        return !this.isSuccess;
    }

    public get resultType() {
        return this._resultType;
    }

    public get error() {
        if (this.isSuccess) {
            throw new Error('Can not retrieve an error from a successful result.');
        }

        return this._error;
    }

    public get value() {
        if (this.isFailure) {
            throw new Error('Can not retrieve value from an error result.');
        }

        return this._value;
    }

    public static pass<U>(value?: U): Result<U> {
        return new Result<U>(ResultType.Pass, undefined, value);
    }

    public static fail<U>(resultType: ResultType, error: string): Result<U> {
        return new Result<U>(resultType, error, undefined);
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (const result of results) {
            if (result.isFailure) return result;
        }

        return Result.pass(null);
    }

}
