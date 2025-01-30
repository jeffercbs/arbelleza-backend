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
            email: payer.email,
            name: payer.name,
            phone: {
              area_code: '+57',
              number: payer.phone,
            },
            address: {
              zip_code: payer.zipCode,
              street_name: payer.address,
            },
          },
          metadata: {
            text: JSON.stringify(createPaymentDto),
          },
          shipments: {
            cost: 0,
            receiver_address: {
              city_name: payer.city,
              country_name: 'Colombia',
              apartment: payer.address,
              zip_code: payer.zipCode,
            },
          },
        },
      });

      return preference.init_point;
    } catch (error) {
      console.log('error', error);
      throw new ServiceUnavailableException(error);
    }
  }

  async validatePayment(data: any) {
    try {
      const {
        data: { id },
      } = data;
      const payment = await new PaymentMP(mercadoPago).get({ id });
      console.log('payment', payment);

      if (payment.status == 'approved') {
        const findPayment = await this.paymentRepository.findBy({
          id: payment.id,
        });

        if (findPayment.length > 0) {
          throw new ServiceUnavailableException('Payment already exists');
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

        await this.paymentRepository.save(newPayment);

        const orderData = JSON.parse(payment.metadata.text);
        const order = new OrderCreatedEvent();

        order.orderId = payment.id;
        order.name = orderData.payer.name;
        order.email = orderData.payer.email;
        order.phone = orderData.payer.phone;
        order.address = orderData.payer.address;
        order.city = orderData.payer.city;
        order.zipCode = orderData.payer.zipCode;
        order.country = orderData.payer.country;

        this.eventEmitter.emit('order.created', order);

        return { message: 'Payment approved' };
      }

      return { message: 'Payment not approved' };
    } catch (error) {
      console.log('error', error);
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
