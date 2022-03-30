import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './child.repository';
import { ItemdDTO } from './dto/item.dto';
import { ItemImageDTO } from './dto/item-image.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}

  async create(dataDTO: ItemdDTO) {
    return await this.itemRepository.createItem(dataDTO);
  }

  async show() {
    const data = await this.itemRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Item fetched successful',
      payload: data,
    };
  }

  async read(id: string) {
    const data = await this.itemRepository.findOne({ where: { id: id } });
    return {
      statusCode: HttpStatus.OK,
      message: `${data.names} fetched successfull`,
      payload: data,
    };
  }

  async edit(dataDTO: ItemdDTO, id) {
    return this.itemRepository.editItem(dataDTO, id);
  }

  async updateImage(dataDTO: ItemImageDTO) {
    const { id, image } = dataDTO;
    const item = await this.read(id);

    item.payload.image = image;

    await this.itemRepository.save(item.payload);

    return item;
  }

  async readImage(image: string): Promise<string> {
    const item = await this.itemRepository.findOne({
      where: { image: image },
    });
    return item.image;
  }
}
