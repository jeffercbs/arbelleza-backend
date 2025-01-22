import { PartialType } from '@nestjs/mapped-types';
import { CreateResendDto } from './create-resend.dto';

export class UpdateResendDto extends PartialType(CreateResendDto) {}
