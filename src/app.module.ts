import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DestinationsModule } from './destinations/destinations.module';
import { BucketListsModule } from './bucket-lists/bucket-lists.module';
import { BucketListItemsModule } from './bucket-list-items/bucket-list-items.module';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './jobs/jobs.module';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm') || {},
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    ScheduleModule.forRoot(),
    UsersModule,
    DestinationsModule,
    BucketListsModule,
    BucketListItemsModule,
    AuthModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
