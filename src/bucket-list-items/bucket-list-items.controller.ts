import { Controller } from '@nestjs/common';
import { BucketListItemsService } from './bucket-list-items.service';

@Controller('bucket-list-items')
export class BucketListItemsController {
  constructor(private readonly bucketListItemsService: BucketListItemsService) {}
}
