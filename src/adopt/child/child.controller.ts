import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrisonService } from 'src/configuration/prison/prison.service';
import { ChildService } from './child.service';
import { ChildDTO } from './dto/child.dto';
import { saveImageToStarage } from './helper/image-storage';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('child')
export class ChildController {
  constructor(
    private childService: ChildService,
    private prisonService: PrisonService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dataDTO: ChildDTO, @Request() req) {
    const user = req.user;
    // const prison = this.prisonService.readByEmail(user.email);
    return this.childService.create(
      dataDTO,
      await this.prisonService.readByEmail(user.email),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async show(@Request() req) {
    const user = req.user;

    // console.log(user);

    return this.childService.show(
      await this.prisonService.readByEmail(user.email),
    );
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.childService.read(id);
  }

  @Patch(':id')
  edit(@Param() id: string, @Body() dataDTO: ChildDTO) {
    return this.childService.edit(dataDTO, id);
  }

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file', saveImageToStarage))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const fileName = file?.filename;

    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    const imagesFolderPath = join(process.cwd(), 'images');
    const fullImagePath = join(imagesFolderPath + '/' + file.filename);
    const data = {
      id: id,
      image: fileName,
    };

    const picture = this.childService.updateImage(data);
    return picture;
    return of({ error: 'File content does not match extenstion !' });
  }

  @Get('image/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res) {
    const imageName = await this.childService.readImage(image);

    return res.sendFile(imageName, { root: './images' });
  }
}
