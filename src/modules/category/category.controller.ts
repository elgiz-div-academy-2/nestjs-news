import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  list() {
    return this.categoryService.list();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }
}
