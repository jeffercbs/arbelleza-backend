import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  orderId: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ default: 'Colombia' })
  country: string;

  @Column()
  postalCode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;
}
