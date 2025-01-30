import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
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
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productRepository.create(createProductDto);
      await this.productRepository.save(newProduct);

      return { message: 'Product created successfully', now: new Date() };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  upladetImage(productId: string, files: Express.Multer.File[]) {
    return `This action updates a #${productId} product`;
  }

  async findAll(page: number) {
    try {
      const pageSize = 16;
      const [result, total] = await this.productRepository.findAndCount({
        order: {
          allowStock: 'DESC',
          weightedRating: 'DESC',
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        select: {
          productId: true,
          name: true,
          brand: true,
          price: true,
          image: true,
          type: true,
          allowStock: true,
          activePriceOffer: true,
          recomendation: true,
          tags: true,
        },
      });

      const totalPages = Math.ceil(total / pageSize);
      const nextCursor = page < totalPages ? page + 1 : null;

      if (result.length === 0) {
        throw new NotFoundException('Not found products');
      }

      return {
        page,
        nextCursor,
        totalPages,
        totalItems: total,
        data: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error;
      }
      throw new ServiceUnavailableException();
    }
  }

  async findInOffer(page: number) {
    try {
      const pageSize = 30;
      const [products, total] = await this.productRepository.findAndCount({
        take: pageSize,
        skip: (page - 1) * pageSize,
        select: {
          productId: true,
          name: true,
          brand: true,
          price: true,
          image: true,
          allowStock: true,
          salePrice: true,
          activePriceOffer: true,
        },
      });

      const totalPages = Math.ceil(total / pageSize);
      const nextCursor = page < totalPages ? page + 1 : null;

      if (!products) {
        throw new NotFoundException('Not found products in offer');
      }

      return {
        page,
        nextCursor,
        totalPages,
        totalItems: total,
        productos: products,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error;
      }
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productId: id,
        },
        select: {
          productId: true,
          name: true,
          brand: true,
          price: true,
          image: true,
          allowStock: true,
          activePriceOffer: true,
          description: true,
          tags: true,
          stock: true,
          images: true,
        },
      });

      if (!product) {
        throw new NotFoundException({ error: 'Not found the product' });
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ServiceUnavailableException();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productId: id,
        },
      });
      if (!product) {
        throw new NotFoundException({ msg: 'Product not found' });
      }

      await this.productRepository.update(product, updateProductDto);
      return { msg: 'ok' };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productId: id,
        },
      });

      if (!product) {
        throw new NotFoundException();
      }

      await this.productRepository.delete(product.productId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ServiceUnavailableException();
    }
  }
}
