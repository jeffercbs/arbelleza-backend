import { PartialType } from '@nestjs/mapped-types';

export class OrderPlayer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}
export class OrderCreatedEvent extends PartialType(OrderPlayer) {
  orderId: number;
}
