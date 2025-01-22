import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdeDto } from './create-orde.dto';
import { CreateOrderDetailDto } from './create-orde-detail';

export class UpdateOrdeDto extends PartialType(CreateOrdeDto) {
  orderDetails: CreateOrderDetailDto[];
}
