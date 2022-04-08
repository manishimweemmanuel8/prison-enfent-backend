import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from '../account/account.service';
import { ProfileDTO } from './dto/profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) // private accountService: AccountService,
  {}

  async create(email, userId) {
    const data = this.profileRepository.createProfile(email);
    if ((await data).statusCode == 201) {
      // const user = await this.accountService.editUserProfile(
      //   (
      //     await data
      //   ).payload,
      //   userId,
      // );
    }
    return data;
  }

  async show() {
    const data = await this.profileRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'All profile fetched successful',
      payload: data,
    };
  }

  async read(email: string) {
    const data = await this.profileRepository.findOne({
      where: { email: email },
    });
    return {
      statusCode: HttpStatus.OK,
      message: `${data.email} profile fetched successfull`,
      payload: data,
    };
  }

  async edit(dataDTO: ProfileDTO, id) {
    const data = this.profileRepository.editProfile(dataDTO, id);

    return data;
  }

  async readByEmail(email: string) {
    const data = await this.profileRepository.findOne({
      where: { email: email },
    });
    return data;
  }
}
