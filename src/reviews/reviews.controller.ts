import { Role } from '@/auth/role.enum';
import { Roles } from '@/auth/roles.decorator';
import { View } from '@/auth/visibility.decorator';
import { Visibility } from '@/auth/visibility.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @View(Visibility.Public)
  @Roles(Role.User)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @View(Visibility.Public)
  @Roles(Role.User)
  findAll(@Query('productId') productId: string) {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Delete(':id')
  @View(Visibility.Public)
  @Roles(Role.User)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
