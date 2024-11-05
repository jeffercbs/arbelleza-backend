import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { View } from '@/auth/visibility.decorator';
import { Visibility } from '@/auth/visibility.enum';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  @View(Visibility.Private)
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @Get()
  @View(Visibility.Private)
  findAll() {
    return this.tokensService.findAll();
  }

  @Get(':id')
  @View(Visibility.Private)
  findOne(@Param('id') id: string) {
    return this.tokensService.findOne(+id);
  }

  @Patch(':id')
  @View(Visibility.Private)
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokensService.update(+id, updateTokenDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  remove(@Param('id') id: string) {
    return this.tokensService.remove(+id);
  }
}
