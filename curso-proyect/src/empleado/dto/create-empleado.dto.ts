import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEmpleadoDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  sector?: string;
}
