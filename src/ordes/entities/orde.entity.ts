import { Payment } from '@/payments/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.entity';

export enum Status {
  waiting = 'waiting for payment',
  confirmed = 'Payment confirm',
  enlisted = 'enlisted order',
  way = 'On the way',
  delivered = 'delivered',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @OneToOne(() => Payment, (payment) => payment.id, {nullable: true})
  paymentId: string;

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;
 
  @Column('decimal')
  total: number;

  @Column({ type: 'enum', enum: Status, default: Status.waiting })
  status: Status;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail)
  orderDetails: OrderDetail;
 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;
}
