import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAdministradorDto {
  @IsOptional()
  @IsNumber()
  id?: number;
}
