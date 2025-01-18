import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entities/News.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepo: Repository<NewsEntity>,
  ) {}

  list() {
    return this.newsRepo.find();
  }

  async create(params: CreateNewsDto) {
    let newsItem = this.newsRepo.create(params);
    await newsItem.save();
    return newsItem;
  }
}
