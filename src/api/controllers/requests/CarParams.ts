import { IsIn, IsNumberString, IsOptional } from 'routing-controllers/node_modules/class-validator';

import { IsPositiveNumberString, StringNumberMaxValue, ValidKeys } from '../../validators';

export class CarParams {

    @IsOptional()
    @ValidKeys(['contains', 'eq'])
    public brand: object;

    @IsOptional()
    @ValidKeys(['contains', 'eq'])
    public model: object;

    @IsOptional()
    @ValidKeys(['eq'])
    public color: object;

    @IsOptional()
    @ValidKeys(['contains', 'eq'])
    public vin: object;

    @IsOptional()
    @ValidKeys(['eq', 'gte', 'lte', 'gt', 'lt', 'neq'])
    public year: object;

    @IsOptional()
    @IsIn(['brand', 'model', 'year', 'color', 'vin', 'updated_at', 'created_at'])
    public order: string;

    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    public order_type: string;

    @IsOptional()
    @IsNumberString()
    @IsPositiveNumberString()
    @StringNumberMaxValue(100)
    public per_page: number;

    @IsOptional()
    @IsNumberString()
    @IsPositiveNumberString()
    @StringNumberMaxValue(9999)
    public page: number;
}
