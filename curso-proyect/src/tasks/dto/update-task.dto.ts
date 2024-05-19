import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    information?: string;

    @IsOptional()
    @IsBoolean()
    finished?: boolean;
}
