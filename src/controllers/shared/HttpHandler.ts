import { Request, Response } from 'express';
import { Result, ResultType } from '../../utils/Result';

export interface IHttpHandler {
    fromResultError<T>(result: Result<T>): Response;
    ok<T>(dto?: T): Response;
    json(code: number, json?: any): Response;
    notFound(message?: string): Response;
    clientError(message?: string): Response;
    failure(error?: Error | string): Response;
}

export interface IActionResult {

}

export class HttpHandler implements IHttpHandler {
    constructor(
        private readonly req: Request,
        private readonly res: Response
    ) {}

    public fromResultError<T>(result: Result<T>) {
        switch (result.resultType) {
            case ResultType.Invalid:
                return this.clientError(result.error);
            case ResultType.NotFound:
                return this.notFound(result.error);
            case ResultType.Unexpected:
                return this.failure(result.error);
            default:
                return this.failure();
        }
    }

    public ok<T>(dto?: T): Response {
        if (dto) {
            return this.res.send(dto)
        }
        return this.res.send();
    }

    public json(code: number, json?: any): Response {
        return this.res.status(code).send(json);
    }

    public notFound(message?: string): Response {
        return this.json(404, { error: message ? message : 'The requested resource could not be found.' });
    }

    public clientError(message?: string): Response {
        return this.json(400, { error: message ? message : 'Invalid data was present within your request' });
    }

    public failure(error?: Error | string): Response {
        console.log(error)
        return this.json(500, { error: error ? error.toString() : 'An unexpected error occurred' });
    }
}