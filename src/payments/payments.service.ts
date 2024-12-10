import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment as PaymentMP, Preference } from 'mercadopago';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { mercadoPago } from './mercadopago.config';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) { }
  async create(createPaymentDto: CreatePaymentDto[]) {
    try {
      const preference = await new Preference(mercadoPago).create({
        body: {
          items: createPaymentDto.map((item) => ({
            id: item.id.toString(),
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
          })),
          metadata: {
            text: 'Ar belleza compra de productos desde tienda',
          },
        },
      });
      return preference.init_point;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async validatePayment(data: any) {
    try {
      const { data: { id } } = data;
      const payment = await new PaymentMP(mercadoPago).get({ id });
      if (payment.status === 'approved') {
        const findPayment = await this.paymentRepository.find({ where: { id: payment.id } });
        if (!findPayment) {
          return { message: 'Payment already exists' };
        }

        const newPayment = await this.paymentRepository.create({
          id: payment.id,
          payment_amount: payment.shipping_amount,
          payment_method: payment.fee_details[0].type,
          payment_status: payment.status,
          ip_address: payment.additional_info.ip_address,
        });

        await this.paymentRepository.save(newPayment);
        return { message: 'Payment approved' };
      }

      return { message: 'Payment not approved' };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    try {
      const payments = await this.paymentRepository.find({});
      return payments;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.paymentRepository.findOne({ where: { id } });
      return payment;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      this.paymentRepository.update(id, updatePaymentDto);
      return { message: 'Payment updated' };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  remove(id: number) {
    try {
      this.paymentRepository.delete(id);
      return { message: 'Payment deleted' };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
