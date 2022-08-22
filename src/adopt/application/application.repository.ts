import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { ApplicationDTO } from './dto/application.dto';
import { Profile } from '../../configuration/profile/entities/profile.entity';
import { Child } from '../child/entities/child.entity';
import { Stage } from './entities/stage.enum';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async createApplication(
    dataDTO: ApplicationDTO,
    profile: Profile,
    child: Child,
  ) {
    const { comment, from, to, stage,leadEmail,leadName,leadPhone } = dataDTO;



    const appliation = this.create({
      comment,
      from,
      to,
      leadEmail,
      leadName,
      leadPhone,
      // certificate:fileName,
      stage: Stage.PENDING,
      child: child,
      profile: profile,
    });
      //  console.log(`email:  ${leadEmail}  childId:  ${leadPhone}  file ${leadName} `);

    // console.log(appliation)



    try {
      const data=await this.save(appliation);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'New Application was created successful',
        payload: data,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        throw new ConflictException('some already exists');
      } else {
        // console.log(error)

        throw new InternalServerErrorException();
      }
    }
  }

  async editApplication(dataDTO: ApplicationDTO, id:string) {
    const { comment, from, to, stage,testimony } = dataDTO;


    const application = await this.findOne(id,{
      relations: ['profile', 'child'],
    });

    application.comment = comment;

    application.stage = stage;
    application.testimony=testimony;

    try {
      await this.save(application);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'application was updated successful',
        payload: application,
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
