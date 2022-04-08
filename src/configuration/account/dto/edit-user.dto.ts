import {
    IsBoolean,
    IsEmail,
  } from 'class-validator';
  
  export class EditUserDto {
    @IsEmail()
    email: string;

    @IsBoolean()
    status: boolean;
    
  }
  