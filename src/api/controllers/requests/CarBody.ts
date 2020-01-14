import {
    IsNotEmpty, IsNumber, IsString, Length, Max, MaxLength, Min
} from 'routing-controllers/node_modules/class-validator';

export class CarBody {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    public brand: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    public model: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1885)
    @Max(2999)
    public year: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    public color: string;

    @IsString()
    @IsNotEmpty()
    @Length(17, 17)
    public vin: string;
}
