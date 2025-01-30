import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Keys, View } from './auth/decorator';
import { Key } from './auth/enum/key.enum';
import { Visibility } from './auth/visibility.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Keys(Key.NotApiKey)
  @View(Visibility.Public)
  getHello(): string {
    return this.appService.getHello();
  }
}
