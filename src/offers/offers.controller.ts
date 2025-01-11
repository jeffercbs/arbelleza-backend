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
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @View(Visibility.Public)
  @Roles(Role.Anonymous)
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}
