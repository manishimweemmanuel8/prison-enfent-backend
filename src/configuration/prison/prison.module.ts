import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/notification/mail/mail.module';
import { AccountModule } from '../account/account.module';
import { PrisonRepository } from './prison.repository';
import { PrisonController } from './prison.controller';
import { PrisonService } from './prison.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrisonRepository]),
    MailModule,
    AccountModule,
    ProfileModule,

  ],
  controllers: [PrisonController],
  providers: [PrisonService],
  exports:[PrisonService]
})
export class PrisonModule {}
