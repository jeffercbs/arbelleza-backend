import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdeDto } from './dto/create-orde.dto';
import { UpdateOrdeDto } from './dto/update-orde.dto';
import { Order } from './entities/orde.entity';

@Injectable()
export class OrdesService {
  constructor(
    @InjectRepository(Order)
    private ordeRepository: Repository<Order>,
  ) { }
  create(createOrdeDto: CreateOrdeDto) {
    return 'This action adds a new orde';
  }

  findAll() {
    return `This action returns all ordes`;
  }

  findOne(id: string) {
    return `This action returns a #${id} orde`;
  }

  update(id: string, updateOrdeDto: UpdateOrdeDto) {
    return `This action updates a #${id} orde`;
  }

  remove(id: string) {
    return `This action removes a #${id} orde`;
  }
}
