import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsOptional()
    id?: number;

    @IsString()
    name: string;

    @IsString()
    information: string;

    @IsBoolean()
    finished: boolean;
}
