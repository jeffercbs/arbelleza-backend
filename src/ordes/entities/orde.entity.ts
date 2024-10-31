import { Client } from '@/clients/entities/client.entity';
import { Payment } from '@/payments/entities/payment.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @OneToOne(() => Client, (Client) => Client.orders)
  client: Client;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column('decimal')
  total: number;

  @Column()
  status: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
