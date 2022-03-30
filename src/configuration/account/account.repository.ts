import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/notification/mail/mail.service';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { EditUserDto } from './dto/edit-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(dataDTO: CreateUserDto, passport: string) {
    const { email, roles } = dataDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(passport, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      roles,
    });

    try {
      await this.save(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User account was created successful',
        payload: user,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editUser(dataDTO: EditUserDto, id) {
    const { email, status } = dataDTO;

    const salt = await bcrypt.genSalt();

    const user = await this.findOne(id);

    user.email = email;
    user.status = status;

    try {
      await this.save(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User account was updated successful',
        payload: user,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editUserProfile(profile, userId) {
    const salt = await bcrypt.genSalt();

    const user = await this.findOne(userId);

    user.profile = profile;

    try {
      await this.save(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User account was updated successful',
        payload: user,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editPassword(dataDTO: UserChangePasswordDto, id) {
    const { password } = dataDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.findOne(id);
    user.password = hashedPassword;

    try {
      await this.save(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User account password was changed successful',
        payload: user,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
