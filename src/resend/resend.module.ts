import { Module } from '@nestjs/common';
import { ResendService } from './resend.service';
import { ResendController } from './resend.controller';

@Module({
  controllers: [ResendController],
  providers: [ResendService],
  exports: [ResendService],
})
export class ResendModule {}
