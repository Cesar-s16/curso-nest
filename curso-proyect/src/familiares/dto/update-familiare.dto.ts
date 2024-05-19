import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateFamiliareDto{
    @IsString()
    @IsOptional()
    cedula?: string;

    @IsOptional()
    userId?: number;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsEnum(['hijo', 'conyuge'])
    @IsOptional()
    type?: 'hijo' | 'conyuge';
}
