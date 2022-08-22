import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { Profile } from '../../profile/entities/profile.entity';
import { Prison } from '../../prison/entities/prison.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  joinDate: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ type: 'enum', enum: Role })
  roles: Role;

  @OneToMany(() => Prison, (prison) => prison.user)
  prisons: Prison[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
