import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsEntity } from './News.entity';
import { NewsActionType } from 'src/modules/news/news.types';
import { UserEntity } from './User.entity';

@Entity('news_action_history')
export class NewsActionHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  newsId: number;

  @Column({ type: 'enum', enum: NewsActionType })
  actionType: NewsActionType;

  @ManyToOne(() => NewsEntity, (item: NewsEntity) => item.actionHistory)
  @JoinColumn({
    name: 'newsId',
  })
  news: NewsEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;
}
