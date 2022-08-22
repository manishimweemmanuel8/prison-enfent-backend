/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PrisonDTO } from './dto/prison.dto';
import { Prison } from './entities/prison.entity';

@EntityRepository(Prison)
export class PrisonRepository extends Repository<Prison> {
  async createPrison(dataDTO: PrisonDTO, userAccount) {
    const { email, names, location } = dataDTO;

    const prison = this.create({
      email,
      names,
      location,
      user: userAccount,
    });

    try {
      await this.save(prison);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Prison account was created successful',
        payload: prison,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        throw new ConflictException('email or names already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editPrison(dataDTO: PrisonDTO, id) {
    const { email, status, names, location } = dataDTO;

    const salt = await bcrypt.genSalt();

    const prison = await this.findOne(id);

    prison.email = email;
    prison.names = names;
    prison.status = status;
    prison.location = location;

    try {
      await this.save(prison);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Prison account was updated successful',
        payload: prison,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('names or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
