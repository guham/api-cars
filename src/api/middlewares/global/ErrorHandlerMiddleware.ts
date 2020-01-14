import { ValidationError } from 'class-validator';
import * as express from 'express';
import { isEmpty, isUndefined } from 'lodash/fp';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { isTooLargeError, PayloadTooLargeError } from '../../../api/errors';
import { Logger, LoggerInterface } from '../../../decorators';
import { env } from '../../../env';

interface ValidationHttpError extends HttpError {
    errors: ValidationError[];
}

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    public isProduction = env.isProduction;

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
        if (res.headersSent) {
            return;
        }

        if (isTooLargeError(error)) {
            error = new PayloadTooLargeError();
        }

        res.status(error.httpCode || 500);
        switch (error.httpCode) {
            case 400:
                if (isUndefined(error[`errors`])) {
                    res.status(error.httpCode);
                    res.json({
                        name: error.name,
                        message: error.message,
                    });
                    break;
                }

                if (!Array.isArray(error[`errors`])) {
                    res.status(error[`errors`].httpCode);
                    res.json({
                        name: error[`errors`].name,
                        message: error[`errors`].message,
                    });
                    break;
                }

                // ValidationError
                res.json({
                    name: error.name,
                    message: error.message,
                    errors: this.formatBadRequestError((error as ValidationHttpError).errors),
                });
                break;
            default:
                res.json({
                    name: error.name,
                    message: error.message,
                });
        }

        if (this.isProduction) {
            this.log.error(error.name, error.message);
        } else {
            this.log.error(error.name, error.stack);
        }
    }

    private formatBadRequestError(error: ValidationError[]): any {
        return error.reduce((acc: [], err: ValidationError): any => {
            const children = isEmpty(err.children) ? undefined : this.formatBadRequestError(err.children);

            const formatedError = {
                field: err.property,
                constraints: err.constraints,
                children,
            };

            return [...acc, formatedError];
        }, []);
    }

}
