import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateFamiliarDto {
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(['hijo', 'conyuge'])
  @IsNotEmpty()
  tipo: 'hijo' | 'conyuge';
}
