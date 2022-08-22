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
import { PrisonService } from '../../configuration/prison/prison.service';
import { ItemService } from '../item/item.service';
import { RequisitionDTO } from './dto/requisition.dto';
import { RequisitionService } from './requisition.service';

@Controller('requisition')
export class RequisitionController {
  constructor(
    private requisitionService: RequisitionService,
    private itemService: ItemService,
    private prisonService: PrisonService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dataDTO: RequisitionDTO, @Request() req) {
    const { itemId } = dataDTO;
    const user = req.user;
    const item = this.itemService.read(itemId);
    console.log(user);
    return this.requisitionService.create(
      dataDTO,
      (await item).payload,
      await this.prisonService.readByEmail(user.email),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async show(@Request() req) {
    const user = req.user;

    return this.requisitionService.show(
      await this.prisonService.readByEmail(user.email),
    );
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.requisitionService.read(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Param() id: string,
    @Body() dataDTO: RequisitionDTO,
    @Request() req,
  ) {
    const { itemId } = dataDTO;
    const user = req.user;
    const item = this.itemService.read(itemId);

    return this.requisitionService.edit(
      dataDTO,
      (await item).payload,
      await this.prisonService.readByEmail(user.email),
      id,
    );
  }

 
}
