import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateUserTaskDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsBoolean()
    finished: boolean;
}