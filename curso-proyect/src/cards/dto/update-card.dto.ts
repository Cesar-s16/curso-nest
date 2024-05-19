import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  @Length(16, 16)
  cardNumber?: string;

  @IsOptional()
  @IsString()
  @Length(5, 5)
  expiryDate?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  cvv?: string;
}
