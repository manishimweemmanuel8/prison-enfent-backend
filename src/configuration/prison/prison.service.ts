import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/notification/mail/mail.service';
import { UsersRepository } from '../account/account.repository';
import { AccountService } from '../account/account.service';
import { Role } from '../account/entities/role.enum';
import { User } from '../account/entities/user.entity';
import { PrisonDTO } from './dto/prison.dto';
import { Prison } from './entities/prison.entity';
import { PrisonRepository } from './prison.repository';

@Injectable()
export class PrisonService {
  constructor(
    @InjectRepository(PrisonRepository)
    private prisonRepository: PrisonRepository,
    private accountService: AccountService,
  ) {}

  async create(dataDTO: PrisonDTO, userAccount) {
    const data = this.prisonRepository.createPrison(dataDTO, userAccount);
    const user = {
      email: dataDTO.email,
      roles: [Role.PRISON],
      status: true,
    };
    if ((await data).statusCode == 201) {
      return this.accountService.create(user);
    }
    return data;
  }

  async show() {
    const data = await this.prisonRepository.find({ relations: ['user'] });
    return {
      statusCode: HttpStatus.OK,
      message: 'All prison fetched successful',
      payload: data,
    };
  }

  async read(id: string) {
    const data = await this.prisonRepository.findOne({ where: { id: id } });
    return {
      statusCode: HttpStatus.OK,
      message: `${data.email} prison fetched successfull`,
      payload: data,
    };
  }

  async readByEmail(email: string) {
    const data= await this.prisonRepository.findOne({ where: { email: email } });
   return data;
  }

  async edit(dataDTO: PrisonDTO, id) {
    return this.prisonRepository.editPrison(dataDTO, id);
  }
}
