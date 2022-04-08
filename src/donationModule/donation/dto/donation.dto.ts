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

  @IsString()
  @IsOptional()

  amount: number;

  @IsBoolean()
  status: boolean;
  // @IsString()
  // @IsEmail()
  // email: string;
}
