import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Item } from './entities/item.entity';
import { ItemdDTO } from './dto/item.dto';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(dataDTO: ItemdDTO) {
    const { names } = dataDTO;

    const item = this.create({
      names,
    });

    try {
      await this.save(item);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'New child was created successful',
        payload: item,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate item names
        throw new ConflictException('Item names already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editItem(dataDTO: ItemdDTO, id) {
    const { names } = dataDTO;

    const item = await this.findOne(id);

    item.names = names;

    try {
      await this.save(item);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Item was updated successful',
        payload: names,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate item names
        throw new ConflictException('Item names already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
