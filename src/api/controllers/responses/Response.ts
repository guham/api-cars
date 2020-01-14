import { Pagination } from '../../interfaces';

export class Response<T> {
    public message: string;
    public data: T | T[];
    public _pagination: Pagination;

    constructor(message: string, data?: T | T[], _pagination?: Pagination) {
        this.message = message;
        this.data = data;
        this._pagination = _pagination;

    }
}
