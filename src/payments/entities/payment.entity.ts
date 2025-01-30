import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  date_created: string;

  @Column({ type: 'varchar' })
  date_approved: string;

  @Column({ type: 'varchar' })
  currency_id: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  method: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column()
  net_received_amount: number;

  @Column()
  total_paid_amount: number;

  @Column({ type: 'varchar', length: 255 })
  ip_address: string;
}
