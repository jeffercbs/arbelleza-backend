import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productRepository.create(createProductDto);
      await this.productRepository.save(newProduct);

      return { message: 'Product created successfully', now: new Date() };
    } catch (error) {
      return { message: 'Error creating product', error };
    }
  }

  upladetImage(productId: string, files: Express.Multer.File[]) {
    return `This action updates a #${productId} product`;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productId: id
        }
      })

      if (!product) {
        throw new NotFoundException({ error: "Not found the product" })
      }
    } catch (error) {
      throw new ServiceUnavailableException()
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productId: id
        }
      })
      if (!product) {
        throw new NotFoundException({ msg: "Product not found" })
      }

      await this.productRepository.update(product, updateProductDto)
      return { msg: "ok" }
    } catch (error) {
      throw new ServiceUnavailableException()
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productId: id
        }
      })

      if (!product) {
        throw new NotFoundException()
      }

      await this.productRepository.delete(product.productId)
    } catch (error) {
      throw new ServiceUnavailableException()
    }
  }
}
