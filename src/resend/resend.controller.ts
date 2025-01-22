import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResendService } from './resend.service';
import { CreateResendDto } from './dto/create-resend.dto';
import { UpdateResendDto } from './dto/update-resend.dto';

@Controller('resend')
export class ResendController {
  constructor(private readonly resendService: ResendService) {}

  @Post()
  create(@Body() createResendDto: CreateResendDto) {
    return this.resendService.send(createResendDto);
  }

  @Get()
  findAll() {
    return this.resendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResendDto: UpdateResendDto) {
    return this.resendService.update(+id, updateResendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resendService.remove(+id);
  }
}
