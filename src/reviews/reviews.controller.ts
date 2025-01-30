import { Role } from '@/auth/role.enum';
import { Roles, View } from '@/auth/decorator';
import { Visibility } from '@/auth/visibility.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @View(Visibility.Private)
  @Roles(Role.User)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @View(Visibility.Private)
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
  @View(Visibility.Private)
  @Roles(Role.User)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
