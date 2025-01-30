import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Resend } from 'resend';
import { CreateResendDto } from '../resend/dto/create-resend.dto';

const resend = new Resend('re_iqstytjn_FQHa5yPz1rSXG7owV6BF9bSf');

const html = (id: number) => `
  <html>
    <head>
      <title>Order Confirmation</title>
    </head>
    <body>
      <h1>Order Confirmation</h1>
      <p>Your order with id #${id} has been confirmed</p>
      <a href="http://localhost:3000/order/${id}">View Order</a>
      </body>
  </html>
`;
@Injectable()
export class ResendService {
  async send(createResendDto: CreateResendDto) {
    try {
      await resend.emails.send({
        from: `Acme ${createResendDto.from}`,
        to: [createResendDto.to],
        subject: 'AR Belleza - Order Confirmation',
        html: html(createResendDto.id),
      });
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
