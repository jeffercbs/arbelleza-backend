import { Module } from '@nestjs/common';
import { OrdesService } from './ordes.service';
import { OrdesController } from './ordes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/orde.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  controllers: [OrdesController],
  providers: [OrdesService],
  exports: [TypeOrmModule],
})
export class OrdesModule {}
