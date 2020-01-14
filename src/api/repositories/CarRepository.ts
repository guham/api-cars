import { EntityManager, EntityRepository } from 'typeorm';

import { Entity } from '../../decorators';
import { PostgreSQLRepository } from '../../lib/postgreSQL';
import { Car } from '../models';

@EntityRepository(Car)
@Entity(Car, __filename)
export class CarRepository extends PostgreSQLRepository<Car> {

    public async findByVin(vin: string): Promise<Car[]> {
        const findByVinQuery = async (manager: EntityManager): Promise<Car[]> => {
            const cars = await manager
                .getRepository(this.entity)
                .createQueryBuilder(this.entity)
                .where({ vin })
                .getMany();
            return cars as Car[];
        };
        return this.handleEntityManagerCalls(findByVinQuery);
    }

}
