import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/Comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ClsService } from 'nestjs-cls';
import { UserEntity } from 'src/entities/User.entity';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentService {
  constructor(
    private cls: ClsService,
    private newsService: NewsService,
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async list(newsId: number) {
    let checkExists = await this.newsService.exists(newsId);

    if (!checkExists) throw new NotFoundException('News is not found');

    let comments = await this.commentRepo.find({
      where: { newsId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          id: true,
          username: true,
          fullName: true,
        },
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });

    return comments;
  }

  async create(newsId: number, params: CreateCommentDto) {
    let user = this.cls.get<UserEntity>('user');

    let checkNews = await this.newsService.exists(newsId);
    if (!checkNews) throw new NotFoundException('News is not found');

    let comment = this.commentRepo.create({
      ...params,
      newsId,
      userId: user.id,
    });
    await comment.save();

    return comment;
  }
}
