/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prison } from '../../../configuration/prison/entities/prison.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stage } from './stage.enum';
import { Child } from '../../child/entities/child.entity';
import { Profile } from '../../../configuration/profile/entities/profile.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'text', nullable: true })
  testimony : string;

  @Column({ type: 'date',nullable: true })
  from: Date;

  @Column({ type: 'date',nullable: true })
  to: Date;

  @Column({ type: 'enum', enum: Stage })
  stage: Stage;

  @Column({ nullable: true })
  leadName: string;

  @Column({ nullable: true })
  leadPhone: string;

  @Column({ nullable: true })
  leadEmail: string;

  
  @Column({ nullable: true })
  certificate: string;
  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Child, (child) => child.applications)
  child: Child;

  @ManyToOne(() => Profile, (profile) => profile.applications)
  profile: Profile;
}
