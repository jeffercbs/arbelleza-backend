import { Module } from '@nestjs/common';
import { OrdesService } from './ordes.service';
import { OrdesController } from './ordes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/orde.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  controllers: [OrdesController],
  providers: [OrdesService, OrderCreatedListener],
  exports: [TypeOrmModule, OrderCreatedListener],
})
export class OrdesModule {}
