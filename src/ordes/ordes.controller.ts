import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdesService } from './ordes.service';
import { CreateOrdeDto } from './dto/create-orde.dto';
import { UpdateOrdeDto } from './dto/update-orde.dto';

@Controller('ordes')
export class OrdesController {
  constructor(private readonly ordesService: OrdesService) {}

  @Post()
  create(@Body() createOrdeDto: CreateOrdeDto) {
    return this.ordesService.create(createOrdeDto);
  }

  @Get()
  findAll() {
    return this.ordesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdeDto: UpdateOrdeDto) {
    return this.ordesService.update(+id, updateOrdeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordesService.remove(+id);
  }
}
