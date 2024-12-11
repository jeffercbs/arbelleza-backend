import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './orde.entity';
import { Product } from '@/products/entities/product.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: 'productId' })
  products: Product;

  @Column('int', {default: 1})
  quantity: number;

  @Column('decimal')
  price: number;
}
