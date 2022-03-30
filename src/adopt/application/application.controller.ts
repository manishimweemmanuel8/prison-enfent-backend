import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from '../../configuration/profile/profile.service';
import { ChildService } from '../child/child.service';
import { ApplicationService } from './application.service';
import { ApplicationDTO } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
    private profileService: ProfileService,
    private childService: ChildService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dataDTO: ApplicationDTO, @Request() req) {
    const { childId } = dataDTO;
    const email = req.user.email;
    // console.log(req.user.email)
    // const prison = this.prisonService.readByEmail(user.email);
    return this.applicationService.create(
      dataDTO,
      await this.profileService.readByEmail(email),
      await (
        await this.childService.read(childId)
      ).payload,
    );
  }

  @Get('child/:id')
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id') id: string, @Request() req) {
    return this.applicationService.show(
      await (
        await this.childService.read(id)
      ).payload,
    );
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.applicationService.read(id);
  }

  @Patch(':id')
  edit(@Param() id: string, @Body() dataDTO: ApplicationDTO) {
    return this.applicationService.edit(dataDTO, id);
  }

  @Get()
  async needToAdopt() {
    return this.childService.needToAdopt();
  }
}
