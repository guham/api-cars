import { HttpError } from 'routing-controllers';

export class CarNotFoundError extends HttpError {
    constructor() {
        super(404, 'Car not found');
    }
}
