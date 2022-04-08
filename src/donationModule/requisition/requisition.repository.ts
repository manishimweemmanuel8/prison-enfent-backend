import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RequisitionDTO } from './dto/requisition.dto';
import { Requisition } from './entities/requisition.entity';

@EntityRepository(Requisition)
export class RequisitionRepository extends Repository<Requisition> {
  async createRequisition(dataDTO: RequisitionDTO, item, prison) {
    const { quality, quantity, status, amountPerQuantity } = dataDTO;

    const requisition = this.create({
      item: item,
      prison: prison,
      quality: quality,
      quantity: quantity,
      status: status,
      amountPerQuantity: amountPerQuantity,
    });

    console.log(requisition);

    try {
      await this.save(requisition);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'New Requisition was created successful',
        payload: requisition,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate item names
        throw new ConflictException('some requisition already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editRequisition(dataDTO: RequisitionDTO, item, prison, id) {
    const { quality, quantity, status, amountPerQuantity } = dataDTO;

    const requisition = await this.findOne(id);

    requisition.amountPerQuantity = amountPerQuantity;
    requisition.item = item;
    requisition.prison = prison;
    requisition.quality = quality;
    requisition.quantity = quantity;
    requisition.status = status;

    try {
      await this.save(requisition);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Requisition was updated successful',
        payload: requisition,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate item names
        throw new ConflictException('Requisition already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
