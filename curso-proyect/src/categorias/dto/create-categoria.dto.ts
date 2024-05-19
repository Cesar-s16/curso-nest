import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  textoAyuda: string;

  @IsNumber()
  @IsNotEmpty()
  idIndicador: number;
}
