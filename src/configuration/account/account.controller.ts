import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MailService } from '../../notification/mail/mail.service';
import { AccountService } from './account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Role } from './entities/role.enum';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  create(@Body() dataDTO: CreateUserDto) {
    return this.accountService.create(dataDTO);
  }

  @Post('/login')
  Login(@Body() dataDTO: UserLoginDto) {
    console.log(dataDTO)
    return this.accountService.login(dataDTO);
  }

  @Get()
  show() {
    return this.accountService.show();
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.accountService.read(id);
  }
  @Patch(':id')
  edit(@Param() id: string, @Body() dataDTO: EditUserDto) {
    return this.accountService.edit(dataDTO, id);
  }

  @Patch('changePassword/:id')
  editPassword(@Param() id: string, @Body() dataDTO: UserChangePasswordDto) {
    return this.accountService.editPassword(dataDTO, id);
  }
}
