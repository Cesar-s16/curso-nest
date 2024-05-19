import { IsString, IsNotEmpty, Length, IsOptional, IsNumber } from 'class-validator';

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    plate: string;

    @IsNotEmpty()
    @IsString()
    @Length(4,15)
    color: string;

    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    brand: string;

    @IsNotEmpty()
    @IsString()
    @Length(4,60)
    model: string;

    @IsOptional()
    @IsNumber()
    owner?: number;
} 
