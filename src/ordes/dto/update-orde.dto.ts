import { PartialType } from '@nestjs/mapped-types';
import { OrderCreatedEvent } from '../events/order-event';
import { CreateOrderDetailDto } from './create-orde-detail';

export class UpdateOrdeDto extends PartialType(OrderCreatedEvent) {
  orderDetails: CreateOrderDetailDto[];
}
