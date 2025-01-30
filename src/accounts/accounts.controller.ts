import { Role } from '@/auth/role.enum';
import { View, Roles } from '@/auth/decorator';
import { Visibility } from '@/auth/visibility.enum';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @View(Visibility.Private)
  @Roles(Role.Admin)
  @Roles(Role.Team)
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @View(Visibility.Private)
  @Roles(Role.User)
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @View(Visibility.Private)
  @Roles(Role.User)
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @View(Visibility.Private)
  @Roles(Role.User)
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
