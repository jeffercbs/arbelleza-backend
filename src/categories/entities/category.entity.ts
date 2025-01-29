import { Offer } from '@/offers/entities/offer.entity';
import { Product } from '@/products/entities/product.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column('text', { default: '', nullable: true })
  categoryDescription: string;

  @Column('varchar', { default: '', nullable: true })
  categoryImage: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToMany(() => Offer, (offer) => offer.categories)
  offers: Offer[];
}
