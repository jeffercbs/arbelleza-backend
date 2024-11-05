import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from '@/accounts/entities/account.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const queryRunner =
      this.usersRepository.manager.connection.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const { firstName, lastName, ...resData } = createUserDto;
      const newAccount = this.accountsRepository.create({
        first_name: firstName,
        last_name: lastName,
      });
      await queryRunner.manager.save(newAccount);

      const newUser = this.usersRepository.create({
        ...resData,
        account: newAccount,
      });
      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
