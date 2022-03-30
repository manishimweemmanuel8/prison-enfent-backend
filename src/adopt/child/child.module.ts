import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildRepository } from './child.repository';
import { PrisonModule } from 'src/configuration/prison/prison.module';
import { AdoptedChildController } from './citizenChild.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChildRepository]), PrisonModule],

  providers: [ChildService],
  controllers: [ChildController,AdoptedChildController],
  exports: [ChildService],
})
export class ChildModule {}
