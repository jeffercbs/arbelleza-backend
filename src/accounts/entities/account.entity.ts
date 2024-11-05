import { Product } from '@/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'lastName', length: 255 })
  first_name: string;

  @Column('varchar', { name: 'firstName', length: 255 })
  last_name: string;

  @Column('date', { nullable: true, default: null })
  birthdate: Date;

  @OneToMany((type) => Product, (product) => product.productId)
  products: Product[];
}
