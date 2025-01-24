import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/Comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
