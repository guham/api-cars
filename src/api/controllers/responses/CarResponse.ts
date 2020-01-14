import {
    IsNotEmpty, IsNumber, IsString, IsUUID, Length, Max, MaxLength, Min
} from 'class-validator';

export class CarResponse {

    @IsUUID('4')
    public id: string;

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

    @IsNotEmpty()
    public createdAt: Date;

    @IsNotEmpty()
    public updatedAt: Date;
}
