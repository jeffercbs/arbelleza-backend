import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class OrderDetailDto {
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  unit_price: number;
}

export class CreateOrderDetailDto extends PartialType(OrderDetailDto) {}
