
import { ValidationError } from 'class-validator';
import { Request } from 'express';
import ext from 'file-extension';
import multer from 'multer';
import { UploadOptions } from 'routing-controllers';

import { BadRequestError } from '../api/errors';

const validMimetypes = [
    'text/csv',
];

export const uploadOptions: UploadOptions = {
    required: true,
    options: {
        storage: multer.diskStorage({
            filename: (req: Request, file: Express.Multer.File, cb: any) => {
                // tslint:disable-next-line:no-null-keyword
                cb(null, `${Date.now().toString()}.${ext(file.originalname)}`);
            },
        }),
        fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
            const isValidMimetype = validMimetypes.some(mimetype => mimetype === file.mimetype);

            if (isValidMimetype && file.originalname.toLowerCase().endsWith('.csv')) {
                // tslint:disable-next-line:no-null-keyword
                cb(null, true);
            } else {
                const invalidCsvError: ValidationError[] = [{
                    property: 'file',
                    value: file.mimetype,
                    constraints: { isValidCsv: 'Invalid file, only csv files are accepted' },
                    children: [],
                }];
                cb(new BadRequestError(invalidCsvError), false);
            }
        },
        limits: {
            fieldNameSize: 1255,
            fileSize: 1024 * 1024 * 5500,
        },
    },
};
