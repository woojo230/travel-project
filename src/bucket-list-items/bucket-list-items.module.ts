import { Module } from '@nestjs/common';
import { BucketListItemsService } from './bucket-list-items.service';
import { BucketListItemsController } from './bucket-list-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketList } from 'src/bucket-lists/entities/bucketList.entity';
import { User } from 'src/users/entities/user.entity';
import { BucketListItem } from './entities/bucketListItem.entity';
import { Destination } from 'src/destinations/entities/destination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BucketList, User, BucketListItem, Destination]),
  ],
  controllers: [BucketListItemsController],
  providers: [BucketListItemsService],
})
export class BucketListItemsModule {}
