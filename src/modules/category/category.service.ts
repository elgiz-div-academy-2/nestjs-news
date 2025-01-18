import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/Category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  list() {
    return this.categoryRepo.find();
  }

  async create(params: CreateCategoryDto) {
    let category = this.categoryRepo.create(params);
    await category.save();
    return category;
  }
}
