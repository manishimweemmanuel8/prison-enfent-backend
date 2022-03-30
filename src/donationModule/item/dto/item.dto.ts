import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ItemdDTO {
  @IsString()
  names: string;
  @IsString()
  @IsOptional()
  image: string;
}
