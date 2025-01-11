import { Payment } from '@/payments/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
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
  @PrimaryColumn()
  orderId: string;

  @OneToOne(() => Payment, (payment) => payment.id, { nullable: true })
  paymentId: string;

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;

  @Column({ type: 'enum', enum: Status, default: Status.waiting })
  status: Status;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ default: 'Colombia' })
  country: string;

  @Column()
  postalCode: string;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail)
  orderDetails: OrderDetail[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;
}
