import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrdeDto } from './dto/update-orde.dto';
import { Order } from './entities/orde.entity';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrdesService {
  constructor(
    @InjectRepository(Order)
    private ordeRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private ordeDetailRepository: Repository<OrderDetail>,
  ) {}

  update(id: string, updateOrdeDto: UpdateOrdeDto) {
    return `This action updates a #${id} orde`;
  }

  remove(id: string) {
    return `This action removes a #${id} orde`;
  }
}
