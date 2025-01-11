import { Product } from '@/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderId: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('int', { default: 1 })
  quantity: number;

  @Column('decimal')
  price: number;
}
