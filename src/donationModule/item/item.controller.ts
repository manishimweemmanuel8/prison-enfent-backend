import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { ItemdDTO } from './dto/item.dto';
import { saveImageToStarage } from './helper/image-storage';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))

  async create(@Body() dataDTO: ItemdDTO) {
    return this.itemService.create(dataDTO);
  }

  @Get()
  async show() {
    return this.itemService.show();
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.itemService.read(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))

  edit(@Param() id: string, @Body() dataDTO: ItemdDTO) {
    return this.itemService.edit(dataDTO, id);
  }

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard('jwt'))

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

    const picture = this.itemService.updateImage(data);
    return picture;
    return of({ error: 'File content does not match extenstion !' });
  }

  @Get('image/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res) {
    const imageName = await this.itemService.readImage(image);

    return res.sendFile(imageName, { root: './images' });
  }
}
