import { HttpError } from 'routing-controllers';

const tooLargeErrorCode = 'LIMIT_FILE_SIZE';

interface MulterError extends Error {
    code?: string;
}

export class PayloadTooLargeError extends HttpError {
    constructor() {
        super(413, 'File Too Large');
        this.name = 'PayloadTooLargeError';
    }
}

export function isTooLargeError(error: HttpError): boolean {
    return (error as MulterError).code === tooLargeErrorCode;
}
