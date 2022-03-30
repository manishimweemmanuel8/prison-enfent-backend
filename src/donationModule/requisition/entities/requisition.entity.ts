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
import { Item } from '../../item/entities/item.entity';
import { Donation } from '../../donation/entities/donation.entity';

@Entity()
export class Requisition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quality: string;

  @Column()
  quantity: number;

  @Column()
  amountPerQuantity: number;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Prison, (prison) => prison.requisitions)
  prison: Prison;

  @ManyToOne(() => Item, (item) => item.requisitions)
  item: Item;

  @OneToMany(() => Donation, (donation) => donation.requisition)
  donations: Donation[];
}
