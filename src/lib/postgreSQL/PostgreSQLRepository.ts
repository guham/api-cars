import { EntityManager, Repository } from 'typeorm';

import { ServerError } from '../../api/errors';
import { LoggerInterface } from '../../lib/logger';
import { operators } from './Operators';

export abstract class PostgreSQLRepository<Entity> extends Repository<Entity> {
    protected entity: string;
    protected log: LoggerInterface;

    public async getAll(props?: object, order?: string, orderType: string = 'ASC', limit?: number, skip?: number): Promise<Entity[]> {
        const getAllQuery = async (manager: EntityManager) => {
            const { query, parameters } = this.parseWhere(props);
            const entities: any = await manager
                .getRepository(this.entity)
                .createQueryBuilder(this.entity)
                .where(query, parameters)
                .orderBy(order, orderType.toUpperCase() as 'ASC' | 'DESC')
                .skip(skip)
                .take(limit)
                .getMany();
            return entities as Entity[];
        };
        return this.handleEntityManagerCalls(getAllQuery);
    }

    public async countAll(props: object): Promise<number> {
        const countAllQuery = async (manager: EntityManager): Promise<number> => {
            const { query, parameters } = this.parseWhere(props);
            const totalOrders = await manager
                .getRepository(this.entity)
                .createQueryBuilder(this.entity)
                .where(query, parameters)
                .getCount();
            return totalOrders;
        };
        return this.handleEntityManagerCalls(countAllQuery);
    }

    /**
     * Executes the query and returns the result.
     * If failed, the DB error is logged and a standard Server error is thrown.
     */
    protected async handleEntityManagerCalls<T>(fn: (manager: EntityManager) => Promise<T>): Promise<T> {
        try {
            return await fn(this.manager);
        } catch (error) {
            this.log.error(error);
            throw new ServerError();
        }
    }

    /**
     * Returns a WHERE condition as string from an object.
     *
     * Example:
     * props: {
     *   brand: {
     *       contains: 'some value',
     *       type: 'string',
     *   },
     *   year: {
     *       gt: '1980',
     *       type: 'number',
     *   },
     * }
     *
     * Returned condition: lower(brand) like :brand AND year >= :year
     *
     * @param props object
     */
    protected parseWhere(props: object): { query: string, parameters: object } {
        const partialQueries = [];
        const parameters = {};

        // tslint:disable-next-line:forin
        for (const prop in props) {
            const operator: string = Object.keys(props[prop])[0];
            const fieldType: string = props[prop].type;
            const mappedOperator: string = operators[operator];
            const value: string = props[prop][operator];
            const lowerValue = value.toLowerCase();

            if (fieldType === 'number') {
                partialQueries.push(`${prop} ${mappedOperator} :${prop}`);
            } else {
                partialQueries.push(`lower(${prop}) ${mappedOperator} :${prop}`);
            }

            if (mappedOperator === 'like') {
                parameters[`${prop}`] = `%${lowerValue}%`;
            } else {
                parameters[`${prop}`] = `${lowerValue}`;
            }
        }

        const query = partialQueries.join(' AND ');

        return { query, parameters };
    }
}
