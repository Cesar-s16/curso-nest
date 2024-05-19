import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsOptional()//
  @IsNumber()
  id?: number;

  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @IsString()
  @Length(5, 5)
  expiryDate: string;

  @IsString()
  @Length(3, 3)
  cvv: string;
}

