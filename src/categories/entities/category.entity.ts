import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column('text')
  categoryDescription: string;

  @Column("varchar", { default: "", nullable: true })
  categoryImage: string

}
