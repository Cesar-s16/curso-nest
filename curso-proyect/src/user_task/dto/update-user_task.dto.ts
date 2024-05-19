import { IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserTaskDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsBoolean()
    finished?: boolean;
}