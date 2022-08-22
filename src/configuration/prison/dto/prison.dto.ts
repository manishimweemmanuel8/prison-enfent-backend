/* eslint-disable prettier/prettier */
import {

  IsBoolean,
  IsEmail,
  IsString,
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
