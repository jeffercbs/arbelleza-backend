import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory =
        await this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(newCategory);
    } catch (error) { }
  }

  async findAll() {
    return await this.categoryRepository.find({
      select: {
        categoryId: true,
        categoryName: true,
        categoryDescription: true,
      },
    });
  }

  async findOne(name: string) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: {
          categoryName: name,
        },
        relations: ['products'],
        select: {
          categoryId: true,
          categoryName: true,
          categoryDescription: true,
          categoryImage: true,
          products: {
            productId: true,
            name: true,
            description: true,
            image: true,
            price: true,
            stock: true,
            brand: true,
            activePriceOffer: true,
          },
        },
      });

      if (!categoryFound) {
        throw new NotFoundException({ msg: 'category not found' });
      }

      return {
        totalProducts: categoryFound.products.length,
        ...categoryFound,
      };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async update(name: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: {
          categoryName: name,
        },
      });

      if (!categoryFound) {
        throw new NotFoundException();
      }

      await this.categoryRepository.update(categoryFound, updateCategoryDto);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async remove(name: string) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: {
          categoryName: name,
        },
      });

      if (!categoryFound) {
        throw new NotFoundException();
      }

      this.categoryRepository.delete(categoryFound.categoryId);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
