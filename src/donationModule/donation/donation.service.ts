import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../../notification/mail/mail.service';
import { Profile } from '../../configuration/profile/entities/profile.entity';
import { Requisition } from '../requisition/entities/requisition.entity';
import { DonationRepository } from './donation.repository';
import { DonationDTO } from './dto/donation.dto';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationRepository)
    private donationRepository: DonationRepository,
    private mailService: MailService,
  ) {}

  async create(
    dataDTO: DonationDTO,
    requisition: Requisition,
    profile: Profile,
  ) {
    const donation = await this.donationRepository.createDonation(
      dataDTO,
      requisition,
      profile,
    );

    if ((await donation).statusCode == 201) {
      await this.mailService.pendingDonation(profile.email);
    }
    return donation;
  }

  async show(requisition: Requisition) {
    const data = await this.donationRepository.find({
      where: { requisition: requisition },
      relations: ['requisition', 'profile'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All Donation fetched successful',
      payload: data,
    };
  }

  async read(id: string) {
    console.log(id);
    const data = await this.donationRepository.findOne({
      where: { id: id },
      relations: ['requisition', 'profile'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: `Donation fetched successfull`,
      payload: data,
    };
  }

  async edit(dataDTO: DonationDTO, id: string) {
    console.log(id);
    const donationData = await this.donationRepository.findOne(id, {
      relations: ['requisition', 'profile'],
    });
    const donation = this.donationRepository.editDonation(dataDTO, id);

    if ((await donation).statusCode == 201) {
      let status: string;
      if ((await donation).payload.status) {
        await this.mailService.donationAction(
          donationData.profile.email,
          (status = 'your donation received successful'),
        );
      } else {
        await this.mailService.donationAction(
          donationData.profile.email,
          (status = "your donation doesn't received please try again"),
        );
      }
    }
    return donation;
  }
}
