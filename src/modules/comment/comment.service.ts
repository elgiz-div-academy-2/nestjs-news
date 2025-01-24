import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/Comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async list(newsId: number) {
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

  async create(newsId: number, params: CreateCommentDto, userId: number) {
    let comment = this.commentRepo.create({ ...params, newsId, userId });
    await comment.save();

    return comment;
  }
}
