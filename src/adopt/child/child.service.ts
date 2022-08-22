import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Prison } from 'src/configuration/prison/entities/prison.entity';
import { PrisonService } from 'src/configuration/prison/prison.service';
import { ChildRepository } from './child.repository';
import { ChildImageDTO } from './dto/child-image.dto';
import { ChildDTO } from './dto/child.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(ChildRepository)
    private childRepository: ChildRepository,
  ) { }

  async create(dataDTO: ChildDTO, prison: Prison) {
    return await this.childRepository.createPrison(dataDTO, prison);
  }

  async show(prison: Prison) {
    console.log(prison);
    const data = await this.childRepository.find({
      where: { prison: prison },
      relations: ['prison'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All Child fetched successful',
      payload: data,
    };
  }

  async read(id: string) {
    const data = await this.childRepository.findOne({ where: { id: id } });
    return {
      statusCode: HttpStatus.OK,
      message: `${data.names} fetched successfull`,
      payload: data,
    };
  }

  async edit(dataDTO: ChildDTO, id) {

    return this.childRepository.editChild(dataDTO, id);
  }

  async updateImage(dataDTO: ChildImageDTO) {
    const { id, image } = dataDTO;
    const child = await this.read(id);

    child.payload.image = image;

    await this.childRepository.save(child.payload);

    return child;
  }

  async readImage(image: string): Promise<string> {
    const child = await this.childRepository.findOne({
      where: { image: image },
    });
    return child.image;
  }

  async needToAdopt() {
    const data = await this.childRepository.find({
      where: { needAdoptation: true, adapted: false },
      relations: ['prison'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All Needed adopted Child fetched successful',
      payload: data,
    };
  }

  async adoptedChild(prison: Prison) {
    const data = await this.childRepository.find({
      where: { prison: prison, adapted: true },
      relations: ['prison'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All adopted Child fetched successful',
      payload: data,
    };
  }

  async notAdoptedChild(prison: Prison) {
    const data = await this.childRepository.find({
      where: { prison: prison, adapted: false, needAdoptation: true },
      relations: ['prison'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All adopted Child fetched successful',
      payload: data,
    };
  }


  async allAdoptedChild() {
    const data = await this.childRepository.find({
      where: { adapted: false },
      relations: ['prison'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All adopted Child fetched successful',
      payload: data,
    };
  }

  async adoptedChildByPrison(prison: Prison) {
    const data = await this.childRepository.find({
      where: { prison: prison, adapted: true },
      relations: ['prison'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All adopted Child by prison fetched successful',
      payload: data,
    };
  }
}
