import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationRepository } from './donation.repository';
import { RequisitionModule } from '../requisition/requisition.module';
import { RequisitionDonationController } from './requisition.controller';
import { ProfileModule } from '../../configuration/profile/profile.module';
import { MailModule } from '../../notification/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DonationRepository]),
    RequisitionModule,
    ProfileModule,
    MailModule,
  ],
  providers: [DonationService],
  controllers: [DonationController, RequisitionDonationController],
})
export class DonationModule {}
