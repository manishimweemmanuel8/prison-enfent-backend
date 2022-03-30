import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ItemImageDTO {
  @IsString()
  id: string;
  @IsString()
  image: string;
}
