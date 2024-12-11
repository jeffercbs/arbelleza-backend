import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdesService } from './ordes.service';
import { CreateOrdeDto } from './dto/create-orde.dto';
import { UpdateOrdeDto } from './dto/update-orde.dto';
import { Role } from '@/auth/role.enum';
import { Roles } from '@/auth/roles.decorator';
import { View } from '@/auth/visibility.decorator';
import { Visibility } from '@/auth/visibility.enum';
import { CreateOrderDetailDto } from './dto/create-orde-detail';

@Controller('ordes')
export class OrdesController {
  constructor(private readonly ordesService: OrdesService) {}

  @Post()
  @View(Visibility.Public)
  @Roles(Role.User)
  create(
    @Body() createOrdeDto: CreateOrdeDto,
    @Body() createOrderDetailDto: CreateOrderDetailDto[],
  ) {
    return this.ordesService.create(createOrdeDto, createOrderDetailDto);
  }

  @Get()
  @View(Visibility.Private)
  @Roles(Role.Admin)
  findAll() {
    return this.ordesService.findAll();
  }

  @Get(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.ordesService.findOne(id);
  }

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateOrdeDto: UpdateOrdeDto) {
    return this.ordesService.update(id, updateOrdeDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.ordesService.remove(id);
  }
}
