import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthorizedRequest } from '../auth/auth.types';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/shared/decorator/role.decorator';
import { UserRole } from '../user/user.types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('news/:newsId/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  list(@Param('newsId') newsId: number) {
    return this.commentService.list(newsId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRole.GUEST)
  @ApiBearerAuth()
  create(@Param('newsId') newsId: number, @Body() body: CreateCommentDto) {
    return this.commentService.create(newsId, body);
  }
}
