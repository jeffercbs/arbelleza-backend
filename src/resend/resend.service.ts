import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateResendDto } from '../resend/dto/create-resend.dto';
import { UpdateResendDto } from '../resend/dto/update-resend.dto';
import { Resend } from 'resend';

const resend = new Resend('re_FAJLPigh_PZ6RDQhHCR9DYj3GvEGBpuMW');

@Injectable()
export class ResendService {
  async send(createResendDto: CreateResendDto) {
    try {
      await resend.batch.send([
        {
          to: `Acme ${createResendDto.to}`,
          from: 'Acme <onboarding@resend.dev>',
          subject: 'Order Confirmation',
          html: 'Your order has been confirmed',
        },
        {
          to: 'Acme ar.bellezaa@outlok.com',
          from: 'Acme <onboarding@resend.dev>',
          subject: 'Order Confirmation',
          html: 'Your order has been confirmed',
        },
      ]);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
