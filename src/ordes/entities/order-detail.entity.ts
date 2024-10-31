import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orde.entity';
import { Product } from '@/products/entities/product.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => Product, (product) => product)
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal')
  unitPrice: number;
}
