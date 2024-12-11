import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class OrderDetailDto {
  @IsNumber()
  orderDetailId: number;

  @IsNumber()
  orderId: string;

  @IsNumber()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDetailDto extends PartialType(OrderDetailDto) {}