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
import { PrisonDTO } from './dto/prison.dto';
import { PrisonService } from './prison.service';

@Controller('prison')
export class PrisonController {
  constructor(private prisonService: PrisonService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dataDTO: PrisonDTO, @Request() req) {
    const user = req.user;
    return this.prisonService.create(dataDTO, user);
  }

  @Get()
  show() {
    return this.prisonService.show();
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.prisonService.read(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  edit(@Param() id: string, @Body() dataDTO: PrisonDTO) {
    return this.prisonService.edit(dataDTO, id);
  }
}
