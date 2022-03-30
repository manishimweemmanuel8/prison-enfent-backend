import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrisonService } from 'src/configuration/prison/prison.service';
import { ChildService } from './child.service';

@Controller('adopted/child')
export class AdoptedChildController {
  constructor(
    private childService: ChildService,
    private prisonService: PrisonService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async adoptedChild(@Request() req) {
    const user = req.user;

    return this.childService.adoptedChild(
      await this.prisonService.readByEmail(user.email),
    );
  }

  @Get('not')
  @UseGuards(AuthGuard('jwt'))
  async notAdoptedChild(@Request() req) {
    const user = req.user;

    return this.childService.notAdoptedChild(
      await this.prisonService.readByEmail(user.email),
    );
  }

  @Get('all')
  async allAdoptedChild() {
    return this.childService.allAdoptedChild();
  }

  @Get(':id')
  async allAdoptedChildByPrison(@Param('id') id: string) {
    return this.childService.adoptedChildByPrison(
      await (
        await this.prisonService.read(id)
      ).payload,
    );
  }
}
