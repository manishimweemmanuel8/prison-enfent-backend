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
  @IsArray()
  roles: Role[];
  @IsBoolean()
  status: boolean;
  
}
