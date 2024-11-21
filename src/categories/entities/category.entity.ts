import { Product } from '@/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column('text', { default: '', nullable: true })
  categoryDescription: string;

  @Column("varchar", { default: "", nullable: true })
  categoryImage: string

  @OneToMany(() => Product, product => product.category)
  products: Product[];

}
