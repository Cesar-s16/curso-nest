import { IsString, IsNotEmpty, IsEmail, MinLength, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsIn(['empleado', 'administrador'])
  type: string;

  @IsString()
  @IsOptional()
  sector?: string;
}
