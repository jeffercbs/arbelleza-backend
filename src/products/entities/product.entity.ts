import { Category } from '@/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 100 })
  sku: string;

  @Column('int', { name: 'categoryId' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'varchar', length: 100 })
  brand: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tags: string;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  long: number;

  @Column({ type: 'float', nullable: true })
  width: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column('decimal')
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  salePrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('int')
  stock: number;

  @Column('boolean', { default: true })
  allowStock: boolean;

  @Column('boolean', { default: false })
  activePriceOffer: boolean;

  @Column('varchar', { length: 255, nullable: true })
  image: string;

  @Column('json', { nullable: true, default: null })
  images: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
