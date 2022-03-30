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

  @Column({ type: 'date' })
  from: Date;

  @Column({ type: 'date' })
  to: Date;

  @Column({ type: 'enum', enum: Stage })
  stage: Stage;

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
