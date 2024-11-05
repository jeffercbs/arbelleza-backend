import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private TokenRepository: Repository<Token>) { }

  async create(createTokenDto: CreateTokenDto) {
    try {
      const newToken = await this.TokenRepository.create(createTokenDto)
      await this.TokenRepository.save(newToken)
    } catch (error) {

    }
  }

  findAll() {
    return this.TokenRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
