import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileDTO } from './dto/profile.dto';
import { Profile } from './entities/profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(email: string) {
    const profile = this.create({
      email,
    });

    try {
      await this.save(profile);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Prison account was created successful',
        payload: profile,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        throw new ConflictException('email or names or phone already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editProfile(dataDTO: ProfileDTO, id) {
    const {
      email,
      status,
      names,
      cell,
      district,
      // dob,
      phone,
      province,
      sector,
      village,
    } = dataDTO;

    const profile = await this.findOne(id);

    profile.email = email;
    profile.names = names;
    profile.status = status;
    profile.cell = cell;
    profile.province = province;
    profile.district = district;
    profile.sector = sector;
    profile.village = village;
    profile.phone = phone;
    // profile.dob=dob;

    console.log(profile);

    try {
      await this.save(profile);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Profile account was updated successful',
        payload: profile,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('names or email or phone already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async editUserProfile(profile, userId) {

  //   const user = await this.findOne(id);

  //   profile.phone = phone;
  //   // profile.dob=dob;

  //   try {
  //     await this.save(profile);
  //     return {
  //       statusCode: HttpStatus.CREATED,
  //       message: 'Prison account was updated successful',
  //       payload: profile,
  //     };
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       // duplicate username
  //       throw new ConflictException('names or email or phone already exists');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
}
