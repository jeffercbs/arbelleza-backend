import { Order, Status } from '@/ordes/entities/orde.entity';
import { OrdesService } from '@/ordes/ordes.service';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment as PaymentMP, Preference } from 'mercadopago';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { mercadoPago } from './mercadopago.config';

const generateHtml = (data: any) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content h2 {
            color: #333;
        }
        .content p {
            margin: 10px 0;
            color: #555;
        }
        .order-details {
            background-color: #f9f9f9;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 20px;
        }
        .order-details p {
            margin: 5px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Thank You for Your Order!</h1>
        </div>
        <div class="content">
            <h2>Hi, [Customer Name]</h2>
            <p>We are pleased to confirm your order. Below are the details of your purchase:</p>

            <div class="order-details">
                <p><strong>Order Number:</strong> #[OrderID]</p>
                <p><strong>Date:</strong> [OrderDate]</p>
                <p><strong>Total:</strong> $[OrderTotal]</p>
            </div>

            <p>Your order will be shipped to:</p>
            <p>[ShippingAddress]</p>

            <p>If you have any questions, feel free to contact our support team. Thank you for shopping with us!</p>
        </div>
        <div class="footer">
            <p>&copy; [YourCompanyName] [Year]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
};

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private readonly orderService: OrdesService,
  ) {}
  async create(createPaymentDto: CreatePaymentDto[]) {
    try {
      const preference = await new Preference(mercadoPago).create({
        body: {
          items: createPaymentDto.map((item) => ({
            id: item.productId,
            title: item.name,
            quantity: item.quantity,
            unit_price: parseInt(item.price.toString()),
            description: item.description,
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
      const {
        data: { id },
      } = data;
      const payment = await new PaymentMP(mercadoPago).get({ id });
      console.log(data);

      if (payment.status === 'approved') {
        const findPayment = await this.paymentRepository.find({
          where: { id: payment.id },
        });

        if (!findPayment) {
          return { message: 'Payment already exists' };
        }

        const newPayment = this.paymentRepository.create({
          id: payment.id,
          payment_amount: payment.shipping_amount,
          payment_method: payment.fee_details[0].type,
          payment_status: payment.status,
          ip_address: payment.additional_info.ip_address,
        });

        console.log(payment.fee_details);
        console.log(payment);
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
