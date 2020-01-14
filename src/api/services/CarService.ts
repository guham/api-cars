import { Request } from 'express';
import fs from 'fs';
import { isEmpty } from 'lodash/fp';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators';
import { loadCsv } from '../../lib/csv-loader';
import { CarVinError } from '../errors';
import {
    CarCsvRow, LineError, PaginatedData, Pagination, ServiceInterface, UploadResult
} from '../interfaces';
import { CarParamsMapper } from '../mappers';
import { Car } from '../models';
import { CarRepository } from '../repositories';
import { getPaginationData } from './Pagination';

@Service('Car')
export class CarService implements ServiceInterface<Car> {

    constructor(
        @OrmRepository() private carRepository: CarRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(params: CarParamsMapper, req: Request): Promise<PaginatedData<Car>> {
        this.log.info('Find all cars');

        try {
            // destructure data useful for pagination, filters and order data
            const { props, perPage, page, order, orderType } = params;
            const skip: number = perPage * page - perPage;

            const [cars, totalCars] = await Promise.all([
                this.carRepository.getAll(props, order, orderType, perPage, skip),
                this.carRepository.countAll(props),
            ]);

            const paginationData: Pagination = getPaginationData(totalCars, perPage, page, req.originalUrl);
            return {
                data: cars,
                _pagination: paginationData,
            };

        } catch (error) {
            this.log.error(error);
            throw error;
        }
    }

    public async findOne(id: string): Promise<Car> {
        this.log.info('Find one car');

        try {
            return this.carRepository.findOne({ id });
        } catch (error) {
            this.log.error(error);
            throw error;
        }
    }

    public async create(car: Partial<Car>): Promise<Car> {
        this.log.info('Create a new car');

        try {
            // validate unique VIN
            const foundCars: Car[] = await this.carRepository.findByVin(car.vin);
            if (!isEmpty(foundCars)) {
                throw new CarVinError();
            }

            return this.carRepository.save(car as Car);
        } catch (error) {
            this.log.error(error);
            throw error;
        }
    }

    public async upload(csvFile: Express.Multer.File): Promise<UploadResult> {
        const filePath = csvFile.path;

        try {
            const errors: LineError[] = [];
            let insertedRows = 0;
            let currentLineNumber = 1;

            const csvRows: CarCsvRow[] = await loadCsv(filePath);
            const cars: Car[] = csvRows.map(Car.buildCar);

            for (const car of cars) {
                try {
                    // improvement: validate the car object using class-validator
                    // await validateOrReject(car);
                    await this.create(car);
                    insertedRows++;
                    currentLineNumber++;
                } catch (error) {
                    currentLineNumber++;
                    errors.push({ line: currentLineNumber, message: error.message });
                }
            }

            return {
                total: cars.length,
                insertedRows,
                errors,
            };
        } catch (error) {
            this.log.error(error);
            throw error;
        } finally {
            // remove the uploaded CSV
            fs.unlinkSync(filePath);
        }
    }

    public async update(currentCar: Car, car: Partial<Car>): Promise<Car> {
        this.log.info('Update a car');

        try {
            // validate unique VIN
            const foundCar: Car = (await this.carRepository.findByVin(car.vin))[0];
            if (!isEmpty(foundCar)) {
                if (foundCar.id !== currentCar.id) {
                    throw new CarVinError();
                }
            }

            car.id = currentCar.id;
            await this.carRepository.save(car as Car);
            return this.carRepository.findOne({ id: car.id });
        } catch (error) {
            this.log.error(error);
            throw error;
        }
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a car');

        try {
            await this.carRepository.delete(id);
        } catch (error) {
            this.log.error(error);
            throw error;
        }
    }

}
