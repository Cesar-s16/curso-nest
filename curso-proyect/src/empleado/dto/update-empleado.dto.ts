import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateEmpleadoDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  sector?: string;
}
