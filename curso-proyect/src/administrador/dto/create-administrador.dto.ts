import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAdministradorDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
