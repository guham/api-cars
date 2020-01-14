import { HttpError } from 'routing-controllers';

export class CarVinError extends HttpError {
    constructor() {
        super(409, 'Car VIN must be unique');
        this.name = 'ConflictError';
    }
}
