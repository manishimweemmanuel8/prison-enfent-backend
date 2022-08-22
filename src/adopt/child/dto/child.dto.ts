import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ChildDTO {
  @IsString()
  @IsOptional()
  motherNames: string;
  @IsString()
  names: string;
  @IsString()
  @IsOptional()
  image: string;


  @IsOptional()
  dob: Date;

  @IsOptional()
  from: Date;

  @IsOptional()
  to: Date;

  @IsString()
  @IsOptional()
  location: string;

  @IsBoolean()
  @IsOptional()
  needAdoptation: boolean;

  @IsBoolean()
  @IsOptional()
  adapted: boolean;
}
