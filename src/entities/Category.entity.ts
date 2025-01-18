import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  beforeUpsert() {
    if (!this.slug && this.name) {
      this.slug = this.name
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, '');
    }
  }
}
