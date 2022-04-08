import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { Stage } from '../entities/stage.enum';

export class ApplicationDTO {
  @IsString()
  @IsOptional()
  stage: Stage;
  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  @IsOptional()
  childId: string;

  @IsDateString()
  @IsOptional()
  from: Date;
  @IsDateString()
  @IsOptional()
  to: Date;

  @IsEmail()
  @IsOptional()
  email: string;
}
