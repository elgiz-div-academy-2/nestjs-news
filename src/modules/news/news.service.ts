import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entities/News.entity';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { CategoryService } from '../category/category.service';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsListQueryDto } from './dto/list-news.dto';
import { NewsActionType } from './news.types';
import { NewsActionHistory } from 'src/entities/NewsActionHistory.entity';

@Injectable()
export class NewsService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(NewsEntity)
    private newsRepo: Repository<NewsEntity>,
    @InjectRepository(NewsActionHistory)
    private newsActionHistoryRepo: Repository<NewsActionHistory>,
  ) {}

  async list(params: NewsListQueryDto) {
    let where: FindOptionsWhere<NewsEntity> = {};
    let order: FindOptionsOrder<NewsEntity> = {};

    if (params.popular) {
      order = {
        views: 'DESC',
        createdAt: 'DESC',
      };
    } else if (params.top) {
      order = {
        like: 'DESC',
        createdAt: 'DESC',
      };
    } else {
      order = {
        createdAt: 'DESC',
      };
    }

    if (params.category) {
      where.categoryId = params.category;
    }

    let [news, total] = await this.newsRepo.findAndCount({
      where,
      select: {
        id: true,
        title: true,
        createdAt: true,
        thumbnail: true,
        slug: true,
        like: true,
        dislike: true,
        views: true,
        category: {
          id: true,
          name: true,
          slug: true,
        },
      },
      relations: ['category'],
      order,
      take: params.limit,
      skip: (params.page - 1) * params.limit,
    });

    return {
      news,
      total,
    };
  }

  async item(id: number) {
    return this.newsRepo.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        thumbnail: true,
        slug: true,
        like: true,
        dislike: true,
        views: true,
        category: {
          id: true,
          name: true,
          slug: true,
        },
        comments: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
      relations: ['category', 'comments', 'comments.user'],
      order: {
        comments: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async create(params: CreateNewsDto) {
    let category = await this.categoryService.findById(params.categoryId);
    if (!category) throw new NotFoundException('Category is not found');

    let newsItem = this.newsRepo.create(params);
    await newsItem.save();
    return newsItem;
  }

  async update(id: number, params: UpdateNewsDto) {
    let item = await this.newsRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('News is not found');

    if (params.categoryId && item.categoryId != params.categoryId) {
      let category = await this.categoryService.findById(params.categoryId);
      if (!category) throw new NotFoundException('Category is not found');
    }

    await this.newsRepo.update({ id }, params);
    return {
      message: 'News is updated successfully',
    };
  }

  async action(newsId: number, type: NewsActionType, userId: number) {
    let item = await this.newsRepo.findOne({ where: { id: newsId } });

    if (!item) throw new NotFoundException('News is not found');

    let userAction = await this.newsActionHistoryRepo.findOne({
      where: {
        newsId: newsId,
        userId: userId,
        actionType: type,
      },
    });
    let increaseValue = 1;

    if (userAction && type !== NewsActionType.VIEW) {
      await userAction.remove();
      increaseValue = -1;
    } else {
      await this.newsActionHistoryRepo.save({
        newsId: newsId,
        userId: userId,
        actionType: type,
      });
    }

    switch (type) {
      case NewsActionType.LIKE:
        await this.newsRepo.increment({ id: item.id }, 'like', increaseValue);
        break;

      case NewsActionType.DISLIKE:
        await this.newsRepo.increment(
          { id: item.id },
          'dislike',
          increaseValue,
        );

        break;
      case NewsActionType.VIEW:
        await this.newsRepo.increment({ id: item.id }, 'views', increaseValue);
        break;
      default:
        throw new BadRequestException("Action you've provided is invalid");
    }

    return {
      message:
        increaseValue === 1 ? 'Actions is completed' : 'Action is removed',
    };
  }
}
