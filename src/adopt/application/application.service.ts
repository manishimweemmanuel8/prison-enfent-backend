import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../../notification/mail/mail.service';
import { Profile } from '../../configuration/profile/entities/profile.entity';
import { Child } from '../child/entities/child.entity';
import { ApplicationRepository } from './application.repository';
import { ApplicationDTO } from './dto/application.dto';
import { Stage } from './entities/stage.enum';
import { ChildService } from '../child/child.service';
import { ChildDTO } from '../child/dto/child.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,
    private mailService: MailService,
    private childService: ChildService,
  ) {}

  async create(dataDTO: ApplicationDTO, profile: Profile, child: Child) {
    const application = await this.applicationRepository.createApplication(
      dataDTO,
      profile,
      child,
    );

    if ((await application).statusCode == 201) {
      await this.mailService.stageEmail(
        profile.email,
        application.payload.stage,
      );
    }
    return application;
  }

  async show(child: Child) {
    console.log(child);
    const data = await this.applicationRepository.find({
      where: { child: child },
      relations: ['profile', 'child'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: `All Application for ${child.names} fetched successful`,
      payload: data,
    };
  }

  async read(id: string) {
    const data = await this.applicationRepository.findOne({
      where: { id: id },
      relations: ['profile', 'child'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: `Application fetched successfull`,
      payload: data,
    };
  }

  async edit(
    dataDTO: ApplicationDTO,

    id: string,
  ) {
    const application = await this.applicationRepository.editApplication(
      dataDTO,

      id,
    );
    if ((await application).statusCode == 201) {
      await this.mailService.stageEmail(
        application.payload.profile.email,
        application.payload.stage,
      );
      if (application.payload.stage === Stage.APPROVED) {
        const childData = {
          motherNames: application.payload.child.motherNames,
          names: application.payload.child.names,
          location: application.payload.child.location,
          needAdoptation: false,
          adapted: false,
          dob: application.payload.child.dob,
          image:application.payload.child.image,
        };
        await this.childService.edit(childData, application.payload.child.id);
      }
    }

    return application;
  }
}
