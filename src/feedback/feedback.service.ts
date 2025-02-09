import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}
  create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const newFeedback = this.feedbackRepository.create(createFeedbackDto);
      this.feedbackRepository.save(newFeedback);
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException({
        message: 'Error creating feedback',
      });
    }
  }

  findAll() {
    return `This action returns all feedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
