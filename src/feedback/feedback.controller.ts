import { Body, Controller, Post } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { Keys, Roles, View } from '@/auth/decorator';
import { Visibility } from '@/auth/visibility.enum';
import { Role } from '@/auth/role.enum';
import { Key } from '@/auth/enum/key.enum';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @View(Visibility.Public)
  @Roles(Role.User)
  @Keys(Key.ApiKey)
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
}
