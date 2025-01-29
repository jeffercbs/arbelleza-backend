import { Body, Controller, Post } from '@nestjs/common';
import { CreateResendDto } from './dto/create-resend.dto';
import { ResendService } from './resend.service';

@Controller('resend')
export class ResendController {
  constructor(private readonly resendService: ResendService) {}

  @Post()
  confirm(@Body() createResendDto: CreateResendDto) {
    return this.resendService.send(createResendDto);
  }
}
