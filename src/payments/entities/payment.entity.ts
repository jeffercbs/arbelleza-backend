import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  date_created: string;

  @Column({ type: 'varchar' })
  date_approved: string;

  @Column()
  currency_id: string;

  @Column()
  amount: number;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column()
  net_received_amount: number;

  @Column()
  total_paid_amount: number;

  @Column({ type: 'varchar', length: 255 })
  ip_address: string;
}
