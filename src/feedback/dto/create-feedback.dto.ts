import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  name: string;
  email: string;
  rating: number;
  frequencyOfVisit: string;
  @IsNotEmpty()
  feedback: string;
}
