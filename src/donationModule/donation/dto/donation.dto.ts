import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class DonationDTO {
  @IsString()
  @IsOptional()
  requisitionId: string;

  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  donationType: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
