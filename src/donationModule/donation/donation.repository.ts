import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Profile } from '../../configuration/profile/entities/profile.entity';
import { EntityRepository, Repository } from 'typeorm';
import { DonationDTO } from './dto/donation.dto';
import { Donation } from './entities/donation.entity';

@EntityRepository(Donation)
export class DonationRepository extends Repository<Donation> {
  async createDonation(dataDTO: DonationDTO, requisition, profile: Profile) {
    const { amount, status,donationType } = dataDTO;

    const donation = this.create({
      status: status,
      amount: amount,
      donationType:donationType,
      requisition: requisition,
      profile: profile,
    });

    console.log(donation);


    try {
      await this.save(donation);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'New Donation was created successful',
        payload: donation,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate item names
        throw new ConflictException('some Donation already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async editDonation(dataDTO: DonationDTO, id) {
    const { status,amount } = dataDTO;

    const donation = await this.findOne(id);

    donation.status = status;
    donation.amount=amount;

    try {
      await this.save(donation);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Donation was updated successful',
        payload: donation,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Donation names
        throw new ConflictException('Donation already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
