import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(newCategory);
    } catch (error) { }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: {
          categoryId: id
        }
      })

      if (!categoryFound) {
        throw new NotFoundException({ msg: "category not found" })
      }

      return categoryFound
    } catch (error) {
      throw new ServiceUnavailableException()
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: {
          categoryId: id
        }
      })

      if (!categoryFound) {
        throw new NotFoundException()
      }

      await this.categoryRepository.update(categoryFound, updateCategoryDto)

    } catch (error) {
      throw new ServiceUnavailableException()

    }
  }

  async remove(id: number) {
    try {
      const categoryFound = await this.categoryRepository.findOne({
        where: {
          categoryId: id
        }
      })

      if (!categoryFound) {
        throw new NotFoundException()
      }

      this.categoryRepository.delete(categoryFound.categoryId)

    } catch (error) {
      throw new ServiceUnavailableException()

    }
  }
}
