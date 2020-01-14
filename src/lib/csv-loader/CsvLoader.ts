import * as csv from 'fast-csv';
import * as fs from 'fs';

/**
 * Read the CSV file and returns an array with each CSV row as an object
 *
 * @param csvPath CSV file path
 */
export const loadCsv = (csvPath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(csvPath)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve(rows));
    });
};
