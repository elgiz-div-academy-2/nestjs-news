import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { NewsModule } from './modules/news/news.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.databaseUrl,
      migrations: [],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      autoLoadEntities: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    AuthModule,
    UserModule,
    NewsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
