import path from 'path';
import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';

import { CarCsvRow } from '../../api/interfaces';
import { Car } from '../../api/models';
import { loadCsv } from '../../lib/csv-loader';

/**
 * Import cars into the DB from a CSV file.
 */
export class CreateCars implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        try {
            const em = connection.createEntityManager();

            const csvRows: CarCsvRow[] = await loadCsv(path.join(__dirname, '../../../data/MOCK_DATA.csv'));

            const cars: Car[] = csvRows.map(Car.buildCar);

            // // improvement: find a way to inject the Car Service in this class
            // in order to use the CarService.upload() method
            return Promise.all(cars.map(async car => {
                try {
                    return em.save(car);
                } catch (error) {
                    return error;
                }
            }));
        } catch (error) {
            throw error;
        }
    }
}
