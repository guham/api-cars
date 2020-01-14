import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { CarCsvRow } from '../interfaces';

@Entity()
export class Car {

    /**
     * Returns a new Car instance from the data of a CSV row
     *
     * @param row a CSV row
     */
    public static buildCar(row: CarCsvRow): Car {
        const { make, model, color, vin, year } = row;

        const car = new Car();
        car.brand = make;
        car.model = model;
        car.color = color;
        car.year = parseInt(year, 10);
        car.vin = vin;

        return car;
    }

    @PrimaryGeneratedColumn('uuid')
    public id: string; // uuid

    @Column()
    public brand: string;

    @Column()
    public model: string;

    @Column()
    public year: number;

    @Column()
    public color: string;

    @Column()
    public vin: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;

    public toString(): string {
        return `${this.brand} ${this.model} ${this.year}`;
    }
}
