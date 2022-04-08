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
import { ProfileDTO } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  create(@Body() dataDTO: ProfileDTO, @Request() req) {
    const userId = req.user.id;
    return this.profileService.create(dataDTO, userId);
  }

  @Get()
  show() {
    return this.profileService.show();
  }

  @Get(':email')
  read(@Param('email') email: string) {
    return this.profileService.read(email);
  }

  @Patch(':id')
  edit(@Param() id: string, @Body() dataDTO: ProfileDTO) {
    return this.profileService.edit(dataDTO, id);
  }
}
