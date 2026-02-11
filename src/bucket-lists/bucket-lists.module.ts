import { Module } from '@nestjs/common';
import { BucketListsService } from './bucket-lists.service';
import { BucketListsController } from './bucket-lists.controller';

@Module({
  controllers: [BucketListsController],
  providers: [BucketListsService],
})
export class BucketListsModule {}
