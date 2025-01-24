import { UserGender, UserRole } from 'src/modules/user/user.types';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.MALE })
  gender: UserGender;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GUEST })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeSave() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
