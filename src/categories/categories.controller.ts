import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { View, Roles } from '@/auth/decorator';
import { Visibility } from '@/auth/visibility.enum';
import { Role } from '@/auth/role.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // TODO: Change the visibility of this endpoint to public
  @Post()
  @View(Visibility.Private)
  @Roles(Role.Admin)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':name')
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findOne(@Param('name') name: string) {
    return this.categoriesService.findOne(name);
  }

  @Patch(':name')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  update(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(name, updateCategoryDto);
  }

  @Delete(':name')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  remove(@Param('name') name: string) {
    return this.categoriesService.remove(name);
  }
}
