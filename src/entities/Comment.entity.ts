import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { NewsEntity } from './News.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  userId: number;

  @Column()
  newsId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne('UserEntity')
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;

  @ManyToOne(() => NewsEntity, (item: NewsEntity) => item.comments)
  news: NewsEntity;
}
