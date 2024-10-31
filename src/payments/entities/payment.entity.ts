import { Order } from '@/ordes/entities/orde.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column()
  paymentAmount: number;

  @Column()
  paymentMethod: string;

  @Column()
  paymentStatus: string;

  @Column()
  paymentType: string;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;
}
