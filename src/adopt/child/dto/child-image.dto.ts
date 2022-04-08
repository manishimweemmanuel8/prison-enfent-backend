import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ChildImageDTO {
  @IsString()
  id: string;
  @IsString()
  image: string;
}
