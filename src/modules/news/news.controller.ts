import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  list() {
    return this.newsService.list();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateNewsDto) {
    return this.newsService.create(body);
  }
}
