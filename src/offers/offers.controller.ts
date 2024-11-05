import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { View } from '@/auth/visibility.decorator';
import { Visibility } from '@/auth/visibility.enum';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @View(Visibility.Private)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @View(Visibility.Public)
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @View(Visibility.Public)
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }

  @Patch(':id')
  @View(Visibility.Private)
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  remove(@Param('id') id: string) {
    return this.offersService.remove(+id);
  }
}
