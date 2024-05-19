import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  textoAyuda?: string;

  @IsInt()
  @IsOptional()
  idIndicador?: number;
}
