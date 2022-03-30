import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PrisonDTO {
  @IsEmail()
  email: string;
  @IsString()
  names: string;
  @IsBoolean()
  status: boolean;

  @IsString()
  location: string;
}
