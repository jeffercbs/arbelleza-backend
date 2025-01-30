import { OrderCreatedEvent } from '@/ordes/events/order-event';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment as PaymentMP, Preference } from 'mercadopago';
import { Repository } from 'typeorm';
import { PaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { mercadoPago } from './mercadopago.config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(createPaymentDto: PaymentDto) {
    const payer = createPaymentDto.payer;
    try {
      const preference = await new Preference(mercadoPago).create({
        body: {
          items: createPaymentDto.products.map((item) => ({
            id: item.productId,
            title: item.name,
            quantity: item.quantity,
            unit_price: parseInt(item.price.toString()),
            description: item.description,
          })),
          payer: {
            name: payer.name || '',
            address: {
              zip_code: payer.zipCode,
              street_name: payer.city,
              street_number: payer.address,
            },
            phone: {
              area_code: '+57',
              number: payer.phone,
            },
            email: payer.email,
          },
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
      const {
        data: { id },
      } = data;
      const payment = await new PaymentMP(mercadoPago).get({ id });

      if (payment.status === 'approved') {
        const findPayment = await this.paymentRepository.find({
          where: { id: payment.id },
        });

        if (!findPayment) {
          return { message: 'Payment already exists' };
        }

        const newPayment = this.paymentRepository.create({
          id: payment.id,
          date_created: payment.date_created,
          date_approved: payment.date_approved,
          currency_id: payment.currency_id,
          amount: payment.transaction_amount,
          method: payment.payment_type_id,
          status: payment.status,
          net_received_amount: payment.transaction_details.net_received_amount,
          total_paid_amount: payment.transaction_details.total_paid_amount,
          ip_address: payment.additional_info.ip_address,
        });

        const order = new OrderCreatedEvent();
        order.orderID = payment.id;
        order.name = payment.payer.first_name + ' ' + payment.payer.last_name;
        order.email = payment.payer.email;
        order.phone = payment.payer.phone.number;
        order.address = payment.payer.address.street_number;
        order.city = payment.payer.address.street_name;
        order.zipCode = payment.payer.address.zip_code;
        order.country = 'Colombia';

        this.eventEmitter.emit('order.created', order);

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
