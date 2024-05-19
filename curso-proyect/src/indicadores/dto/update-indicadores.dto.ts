import { IsOptional, IsString } from 'class-validator';

export class UpdateIndicadorDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  alias?: string;

  @IsString()
  @IsOptional()
  textoAyuda?: string;
}