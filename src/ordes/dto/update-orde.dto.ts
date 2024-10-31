import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdeDto } from './create-orde.dto';

export class UpdateOrdeDto extends PartialType(CreateOrdeDto) {}
