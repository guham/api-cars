import { Pagination } from './Pagination';

export interface PaginatedData<T> {
    data: T[];
    _pagination: Pagination;
}
