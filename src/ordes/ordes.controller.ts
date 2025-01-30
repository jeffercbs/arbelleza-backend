import { Role } from '@/auth/role.enum';
import { Roles, View } from '@/auth/decorator';
import { Visibility } from '@/auth/visibility.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateOrdeDto } from './dto/update-orde.dto';
import { OrdesService } from './ordes.service';

@Controller('ordes')
export class OrdesController {
  constructor(private readonly ordesService: OrdesService) {}

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateOrdeDto: UpdateOrdeDto) {
    return this.ordesService.update(id, updateOrdeDto);
  }

  @Get(':id')
  @View(Visibility.Public)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordesService.findOne(id);
  }

  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.ordesService.remove(id);
  }
}
