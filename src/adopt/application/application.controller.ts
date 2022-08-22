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
import { ProfileService } from '../../configuration/profile/profile.service';
import { ChildService } from '../child/child.service';
import { ApplicationService } from './application.service';
import { ApplicationDTO } from './dto/application.dto';
import { saveImageToStarage } from './helper/image-storage';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('application')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
    private profileService: ProfileService,
    private childService: ChildService,
  ) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() dataDTO: ApplicationDTO, @Request() req,   
  ) {
    const { email,childId } = dataDTO;

    return this.applicationService.create(
      // fileName,
      dataDTO,
      await this.profileService.readByEmail(email),
      await (
        await this.childService.read(childId)
      ).payload,
    );
  }

  @Post('uploadCertificate/:id')
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

    const picture = this.applicationService.updateImage(data);
    if(picture){
      return picture
      return of({ error: 'File content does not match extenstion !' });

    }else{
      this.applicationService.delete(id);
    }

  }

  @Get('image/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res) {

    console.log(image);
    const imageName = await this.applicationService.readImage(image);

    return res.sendFile(imageName, { root: './images' });
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

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async showApprovedApplicationByProfile(@Request() req) {
    const email = req.user.email;

    return this.applicationService.showApprovedApplicationByProfile(
      await this.profileService.readByEmail(email),
    );
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.applicationService.read(id);
  }

  @Patch(':id')
  edit(@Param() id: string, @Body() dataDTO: ApplicationDTO) {
    console.log(id);
    return this.applicationService.edit(dataDTO, id);
  }

  @Get()
  async needToAdopt() {
    return this.childService.needToAdopt();
  }
}
