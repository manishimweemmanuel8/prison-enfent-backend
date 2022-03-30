import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prison } from '../../configuration/prison/entities/prison.entity';
import { Item } from '../item/entities/item.entity';
import { RequisitionRepository } from './requisition.repository';
import { RequisitionDTO } from './dto/requisition.dto';

@Injectable()
export class RequisitionService {
  constructor(
    @InjectRepository(RequisitionRepository)
    private requisitionRepository: RequisitionRepository,
  ) {}

  async create(dataDTO: RequisitionDTO, item: Item, prison: Prison) {
    return await this.requisitionRepository.createRequisition(
      dataDTO,
      item,
      prison,
    );
  }

  async show(prison: Prison) {
    const data = await this.requisitionRepository.find({
      where: { prison: prison },
      relations: ['prison', 'item'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All Requisition fetched successful',
      payload: data,
    };
  }

  async read(id: string) {
    const data = await this.requisitionRepository.findOne({
      where: { id: id },
      relations: ['prison', 'item'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: `Requisition fetched successfull`,
      payload: data,
    };
  }

  async edit(dataDTO: RequisitionDTO, item: Item, prison: Prison, id) {
    return this.requisitionRepository.editRequisition(
      dataDTO,
      item,
      prison,
      id,
    );
  }

  async showActiveRequisition() {
    const data = await this.requisitionRepository.find({
      where: { status: true },
      relations: ['prison', 'item'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All active Requisition fetched successful',
      payload: data,
    };
  }

  async showActiveRequisitionByPrison(prison: Prison) {
    const data = await this.requisitionRepository.find({
      where: { prison: prison, status: true },
      relations: ['prison', 'item'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'All Requisition by prison fetched successful',
      payload: data,
    };
  }
}
