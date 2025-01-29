import { OrderPlayer } from '@/ordes/events/order-event';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePaymentDto extends PartialType(CreateProductDto) {
  productId: string;
  quantity: number;
}

export class PaymentDto {
  products: CreatePaymentDto[];
  payer?: OrderPlayer;
}
