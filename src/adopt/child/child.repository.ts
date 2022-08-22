import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Child } from './entities/child.entity';
import { ChildDTO } from './dto/child.dto';
import { Prison } from '../../configuration/prison/entities/prison.entity';

@EntityRepository(Child)
export class ChildRepository extends Repository<Child> {
  async createPrison(dataDTO: ChildDTO, prison: Prison) {
    const { adapted, dob, motherNames, needAdoptation, names, location ,from,to} =
      dataDTO;

    const child = this.create({
      adapted:false,
      dob,
      motherNames,
      needAdoptation,
      names,
      location,
      from,
      to,
      prison: prison,
    });
    console.log(child);

    try {
      await this.save(child);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'New child was created successful',
        payload: child,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        throw new ConflictException('some already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editChild(dataDTO: ChildDTO, id) {
    const { adapted, dob, motherNames, needAdoptation, names, location , from,to} =
      dataDTO;

    const child = await this.findOne(id);

    child.motherNames = motherNames;
    child.names = names;
    child.dob = dob;
    child.location = location;
    child.adapted = adapted;
    child.needAdoptation = needAdoptation;
    child.from=from;
    child.to=to;


    try {
      await this.save(child);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'child was updated successful',
        payload: child,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('some already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
