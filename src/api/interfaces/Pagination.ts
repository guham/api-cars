export interface Pagination {
    total_records: number;
    page_size: number;
    page_number: number;
    _links: {
        first: string;
        previous: string;
        actual: string;
        next: string;
        last: string;
    };
}
