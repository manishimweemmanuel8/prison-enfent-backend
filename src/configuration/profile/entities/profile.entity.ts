import { Application } from '../../../adopt/application/entities/application.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Donation } from '../../../donationModule/donation/entities/donation.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  names: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  province: string;
  @Column({ nullable: true })
  district: string;
  @Column({ nullable: true })
  sector: string;
  @Column({ nullable: true })
  cell: string;
  @Column({ nullable: true })
  village: string;

  // @Column()
  // dob: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  // @OneToOne(() => User, (user) => user.profile)
  // user: User;

  @OneToMany(() => Application, (application) => application.profile)
  applications: Application[];

  @OneToMany(() => Donation, (donation) => donation.profile)
  donations: Donation[];
}
