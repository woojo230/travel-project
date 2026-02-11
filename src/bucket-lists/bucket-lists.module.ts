import { Module } from '@nestjs/common';
import { BucketListsService } from './bucket-lists.service';
import { BucketListsController } from './bucket-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketList } from './entities/bucketList.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BucketList, User])],
  controllers: [BucketListsController],
  providers: [BucketListsService],
})
export class BucketListsModule {}
