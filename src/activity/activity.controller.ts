import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { View } from '@/auth/visibility.decorator';
import { Visibility } from '@/auth/visibility.enum';
import { Role } from '@/auth/role.enum';
import { Roles } from '@/auth/roles.decorator';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @View(Visibility.Private)
  @Roles(Role.Team)
  @Roles(Role.Admin)
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  @View(Visibility.Private)
  @Roles(Role.Admin)
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  @View(Visibility.Private)
  @Roles(Role.Team)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
