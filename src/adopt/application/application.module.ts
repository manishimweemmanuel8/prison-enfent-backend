import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../notification/mail/mail.module';
import { ProfileModule } from '../../configuration/profile/profile.module';
import { ChildModule } from '../child/child.module';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRepository]),
    ProfileModule,
    ChildModule,
    MailModule
  ],

  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
