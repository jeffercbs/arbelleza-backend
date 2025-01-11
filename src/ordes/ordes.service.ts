import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdeDto } from './dto/create-orde.dto';
import { UpdateOrdeDto } from './dto/update-orde.dto';
import { Order } from './entities/orde.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailDto } from './dto/create-orde-detail';

@Injectable()
export class OrdesService {
  constructor(
    @InjectRepository(Order)
    private ordeRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private ordeDetailRepository: Repository<OrderDetail>,
  ) {}
  async create(
    createOrdeDto: CreateOrdeDto,
    createOrderDetailDto: CreateOrderDetailDto[],
  ) {
    try {
      const newOrder = this.ordeRepository.create(createOrdeDto);
      await this.ordeRepository.save(newOrder);

      await Promise.all(
        createOrderDetailDto.map(async (detail) => {
          const newOrderDetail = this.ordeDetailRepository.create(detail);
          newOrderDetail.orderId = newOrder.orderId;
          await this.ordeDetailRepository.save(newOrderDetail);
        }),
      );

      return { message: 'Order created successfully' };
    } catch {
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    try {
      const orders = await this.ordeRepository.find({});

      if (!orders) {
        return { message: 'No order found' };
      }

      return orders;
    } catch {
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: string) {
    try {
      const foundOrder = await this.ordeRepository.find({
        where: { orderId: id },
        relations: ['orderDetails'],
      });

      if (!foundOrder) {
        return { message: 'Order not found' };
      }

      return foundOrder;
    } catch {
      throw new ServiceUnavailableException();
    }
  }

  update(id: string, updateOrdeDto: UpdateOrdeDto) {
    return `This action updates a #${id} orde`;
  }

  remove(id: string) {
    return `This action removes a #${id} orde`;
  }
}
