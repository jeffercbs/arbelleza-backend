import { CreateOrdeDto } from '@/ordes/dto/create-orde.dto';
import { OrderDetail } from '@/ordes/entities/order-detail.entity';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

class CreateOrderDetailDtoX extends PartialType(OrderDetail) {}

export class CreatePaymentDto extends PartialType(CreateProductDto) {
  productId: string;
  quantity: number;
}
