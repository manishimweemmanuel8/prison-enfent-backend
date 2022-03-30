import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
