import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RequisitionDTO {
  @IsString()
  @IsOptional()
  itemId: string;
  @IsString()
  quality: string;

  @IsString()
  quantity: any;

  @IsString()
  amountPerQuantity: any;

  @IsBoolean()
  status: boolean;
}
