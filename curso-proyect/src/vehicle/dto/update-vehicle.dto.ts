import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class UpdateVehicleDto {
    @IsString()
    @IsOptional()
    plate?: string;

    @IsString()
    @Length(4,15)
    @IsOptional()
    color?: string;

    @IsOptional()
    @IsString()
    @Length(4,20)
    brand?: string;

    @IsOptional()
    @IsString()
    @Length(4,60)
    model?: string;

    @IsOptional()
    @IsNumber()
    owner?: number;
}
