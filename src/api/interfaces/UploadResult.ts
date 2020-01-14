import { LineError } from './LineError';

export interface UploadResult {
    total: number;
    insertedRows: number;
    errors: LineError[];
}
