import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Data } from 'ejs';

export class ProfileDTO {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  names: string;
  @IsBoolean()
  @IsOptional()
  status: boolean;
  // @IsDate()
  // dob: Data;
  @IsString()
  @IsOptional()
  province: string;
  @IsString()
  @IsOptional()
  district: string;
  @IsString()
  @IsOptional()
  sector: string;
  @IsString()
  @IsOptional()
  cell: string;
  @IsString()
  @IsOptional()
  village: string;
  @IsString()
  @IsOptional()
  phone: string;
}
