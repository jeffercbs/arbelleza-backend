import { CreateOrderDetailDto } from './create-orde-detail';

export class CreateOrdeDto {
  orderID: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  orderDetails: CreateOrderDetailDto[];
}
