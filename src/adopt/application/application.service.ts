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
import { CertificateImageDTO } from './dto/certificate-image.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,
    private mailService: MailService,
    private childService: ChildService,
  ) {}

  async create(dataDTO: ApplicationDTO, profile: Profile, child: Child) {

    // console.log(fileName);
    const application = await this.applicationRepository.createApplication(
      dataDTO,
      profile,
      child,
    );

    // console.log((await application).statusCode == 201);

    if ((await application).statusCode == 201) {
      await this.mailService.stageEmail(
        profile.email,
        application.payload.stage,
      ); 

      await this.mailService.leadEmail(
        dataDTO.leadEmail,
        dataDTO.leadName,
        profile.names,
        profile.phone,
        profile.district,
        profile.sector,
        profile.cell,
        profile.village,
        application.payload.id,
      )
    }
    return application;
  }

  async show(child: Child) {
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

  async showApprovedApplicationByProfile(profile: Profile) {
    const data = await this.applicationRepository.find({
      where: { profile: profile, stage: Stage.APPROVED },
      relations: ['profile', 'child'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: `All Application forfetched successful`,
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
          comment:application.payload.comment,
          testimony:application.payload.testimony,
          needAdoptation: false,
          adapted: true,
          dob: application.payload.child.dob,
          image: application.payload.child.image,
          from: application.payload.child.from,
          to:application.payload.child.to,
        };
        await this.childService.edit(childData, application.payload.child.id);
      }
    }

    return application;
  }

  async delete(id:string){
  return await this.applicationRepository.delete(id);
  }

  async updateImage(dataDTO: CertificateImageDTO) {
    const { id, image } = dataDTO;
    const appliation = await this.read(id);

    appliation.payload.certificate = image;

    await this.applicationRepository.save(appliation.payload);

    return appliation;
  }

  async readImage(image: string): Promise<string> {
    const appliation = await this.applicationRepository.findOne({
      where: { certificate: image },
    });
    return appliation.certificate;
  }

}
