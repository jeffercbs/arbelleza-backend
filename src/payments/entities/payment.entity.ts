import { Order } from '@/ordes/entities/orde.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @Column({ type: "bigint", unique: true, primary: true })
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column()
  payment_amount: number;

  @Column()
  payment_method: string;

  @Column()
  payment_status: string;

  @Column({ type: "varchar", length: 255 })
  ip_address: string;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;
}
