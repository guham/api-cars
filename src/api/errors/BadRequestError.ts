import { ValidationError } from 'class-validator';
import { BadRequestError as BadRequest } from 'routing-controllers';

export class BadRequestError extends BadRequest {
    public errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super(`Invalid body, check 'errors' property for more info.`);
        this.errors = errors;
    }
}
