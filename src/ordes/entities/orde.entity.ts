import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn({ type: 'bigint' })
  orderId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar', default: 'Colombia' })
  country: string;

  @Column({ type: 'varchar' })
  zipCode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;
}
