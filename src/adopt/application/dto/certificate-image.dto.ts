import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CertificateImageDTO {
  @IsString()
  id: string;
  @IsString()
  image: string;
}
