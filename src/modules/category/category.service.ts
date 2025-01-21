import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/Category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  findById(categoryId: number) {
    return this.categoryRepo.findOne({ where: { id: categoryId } });
  }

  list() {
    return this.categoryRepo.find();
  }

  async categoryNews(categoryId: number) {
    let category = await this.categoryRepo.find({
      where: { id: categoryId },
      relations: ['news'],
    });

    return category;
  }

  async create(params: CreateCategoryDto) {
    let category = this.categoryRepo.create(params);
    await category.save();
    return category;
  }

  async update(id: number, params: UpdateCategoryDto) {
    let category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) throw new NotFoundException('Category is not found');

    await this.categoryRepo.update({ id }, params);

    return {
      message: 'Category is updated successfully',
    };
  }

  async delete(id: number) {
    let result = await this.categoryRepo.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException('Category is not found');

    return {
      message: 'Category is deleted sucessfully',
    };
  }
}
