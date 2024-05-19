import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIndicadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsNotEmpty()
  textoAyuda: string;
}
