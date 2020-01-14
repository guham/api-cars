import { merge, pickBy } from 'lodash/fp';

import { CarParams } from '../controllers/requests';
import { Mapper } from './Mapper';

export class CarParamsMapper extends Mapper {
    public order: string;
    public orderType: string;
    public perPage: number;
    public page: number;
    public props: object;

    constructor(carParams: CarParams) {
        super();
        this.page = Number(carParams.page) || 1;
        this.perPage = Number(carParams.per_page) || 10;
        this.order = carParams.order || 'brand';
        this.orderType = carParams.order_type || 'asc';
        this.props = pickBy(this.removeUndefined, {
            brand: merge(carParams.brand, { type: 'string' }),
            model: merge(carParams.model, { type: 'string' }),
            color: merge(carParams.color, { type: 'string' }),
            vin: merge(carParams.vin, { type: 'string' }),
            year: merge(carParams.year, { type: 'number' }),
        });
    }
}
