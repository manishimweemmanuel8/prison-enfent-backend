import { Child } from '../../../adopt/child/entities/child.entity';
import { User } from '../../account/entities/user.entity';
import { Requisition } from '../../../donationModule/requisition/entities/requisition.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Prison {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  names: string;
  @Column({ unique: true })
  email: string;

  @Column()
  location: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => User, (user) => user.prisons)
  user: User;

  @OneToMany(() => Child, (child) => child.prison)
  children: Child[];

  @OneToMany(() => Requisition, (requisition) => requisition.prison)
  requisitions: Requisition[];
}
