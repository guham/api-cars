import { operators } from '../../lib/postgreSQL';

export abstract class Mapper {
    /**
     * A valid "by-property" filter (brand, model, etc.) must have 2 fields:
     * - the operator: contains, eq, gt, etc.
     * - the type: string, number, etc
     */
    public removeUndefined = (prop: any) => {
        return Object.keys(operators).some(operator => Object.keys(prop).includes(operator));
    }
}
