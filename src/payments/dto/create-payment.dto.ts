import { CreateOrdeDto } from '@/ordes/dto/create-orde.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePaymentDto extends PartialType(CreateOrdeDto) {
  unit_price: number;
  title: string;
}
