import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  thumbnail: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  beforeUpsert() {
    if (!this.slug && this.title) {
      this.slug = this.title
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, '');
    }
  }
}
