import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports:[ProfileService],
})
export class ProfileModule {}
