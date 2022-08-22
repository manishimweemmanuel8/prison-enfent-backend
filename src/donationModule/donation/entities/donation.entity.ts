/* eslint-disable prettier/prettier */
import { Profile } from '../../../configuration/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Requisition } from '../../requisition/entities/requisition.entity';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true,default:0})
  amount: number;

  @Column({nullable:true})
  donationType: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Requisition, (requisition) => requisition.donations)
  requisition: Requisition;

  @ManyToOne(() => Profile, (profile) => profile.applications)
  profile: Profile;
}
