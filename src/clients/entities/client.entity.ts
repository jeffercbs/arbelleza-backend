import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Product } from '@/products/entities/product.entity';
import { Order } from '@/ordes/entities/orde.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  clientId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'client_liked_products',
    joinColumn: { name: 'clientId', referencedColumnName: 'clientId' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'productId' },
  })
  likedProducts: Product[];

  @OneToMany(() => Order, (order) => order.client)
  @JoinTable({
    name: 'orders',
    joinColumn: { name: 'clientId', referencedColumnName: 'clientId' },
    inverseJoinColumn: { name: 'orderId', referencedColumnName: 'orderId' },
  })
  orders: Order[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
