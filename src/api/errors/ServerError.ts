import { InternalServerError } from 'routing-controllers';

export class ServerError extends InternalServerError {
    constructor() {
        super('The server could not process the request, please try again later.');
    }
}
