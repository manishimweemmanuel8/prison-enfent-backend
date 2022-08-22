/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../../notification/mail/mail.service';
import { UsersRepository } from './account.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private profileService: ProfileService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async generatePassword() {
    let length = 12,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  async create(dataDTO: CreateUserDto) {
    const password = await this.generatePassword();

    const data = this.usersRepository.createUser(dataDTO, password);
    if ((await data).statusCode == 201) {
      await this.mailService.credentialEmail(dataDTO.email, password);
      console.log('hello');

      const profile = await this.profileService.create(
        dataDTO.email,
        (
          await data
        ).payload.id,
      );
      if ((await profile).statusCode == 201) {
        console.log(profile.payload);
        await this.usersRepository.editUserProfile(
          profile.payload,
          (
            await data
          ).payload.id,
        );
      }
    }
    return data;
  }

  async login(signinDto: UserLoginDto) {
    const { email, password } = signinDto;
    const user = await this.usersRepository.findOne({
      email,
      status: true,
    });

    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const email = user.email;
      const roles = user.roles;
      const payload: JwtPayload = { email, roles };
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login operation done successful',
        payload: accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async show() {
    const data = await this.usersRepository.find({ relations: ['profile'] });
    return {
      statusCode: HttpStatus.OK,
      message: 'All user fetched successful',
      payload: data,
    };
  }

  async read(id: string) {
    const data = await this.usersRepository.findOne({ where: { id: id } });
    return {
      statusCode: HttpStatus.OK,
      message: `${data.email} user fetched successfull`,
      payload: data,
    };
  }

  async edit(dataDTO: EditUserDto, id) {
    return this.usersRepository.editUser(dataDTO, id);
  }

  async editPassword(dataDTO: UserChangePasswordDto, id) {
    return this.usersRepository.editPassword(dataDTO, id);
  }

  async editUserProfile(profile, userId) {
    return this.usersRepository.editUserProfile(profile, userId);
  }
}
