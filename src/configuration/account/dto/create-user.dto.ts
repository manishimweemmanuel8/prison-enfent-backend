/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;
  roles: Role;
  @IsBoolean()
  status: boolean;
  
}
