import { ResendModule } from '@/resend/resend.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orde.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrdesController } from './ordes.controller';
import { OrdesService } from './ordes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail]), ResendModule],
  controllers: [OrdesController],
  providers: [OrdesService, OrderCreatedListener],
  exports: [TypeOrmModule, OrderCreatedListener],
})
export class OrdesModule {}
