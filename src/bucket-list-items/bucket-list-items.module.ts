import { Module } from '@nestjs/common';
import { BucketListItemsService } from './bucket-list-items.service';
import { BucketListItemsController } from './bucket-list-items.controller';

@Module({
  controllers: [BucketListItemsController],
  providers: [BucketListItemsService],
})
export class BucketListItemsModule {}
