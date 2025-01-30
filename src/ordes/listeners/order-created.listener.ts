import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-event';
import { Repository } from 'typeorm';
import { Order } from '../entities/orde.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderCreatedListener {
  constructor(
    @InjectRepository(Order)
    private ordeRepository: Repository<Order>,
  ) {}

  @OnEvent('order.created')
  handleOrderCreatedEvent(payload: OrderCreatedEvent) {
    try {
      const newOrde = this.ordeRepository.create(payload);
      this.ordeRepository.save(newOrde);
    } catch (error) {
      throw new Error('Error creating order');
    }
  }
}
