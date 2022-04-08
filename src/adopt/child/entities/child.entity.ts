import { Prison } from '../../../configuration/prison/entities/prison.entity';
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
import { Application } from '../../application/entities/application.entity';

@Entity()
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  names: string;

  @Column()
  motherNames: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  location: string;

  @Column()
  needAdoptation: boolean;

  @Column()
  adapted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Prison, (prison) => prison.children)
  prison: Prison;

  @OneToMany(() => Application, (application) => application.child)
  applications: Application[];
}
