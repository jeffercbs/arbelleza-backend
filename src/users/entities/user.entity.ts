import { Account } from '@/accounts/entities/account.entity';
import { Role } from '@/auth/role.enum';
import { Order } from '@/ordes/entities/orde.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('text', { nullable: true, default: null })
  token: string;

  @Column('enum', { enum: Role, default: Role.User })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
