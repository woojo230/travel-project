import { Controller } from '@nestjs/common';
import { BucketListsService } from './bucket-lists.service';

@Controller('bucket-lists')
export class BucketListsController {
  constructor(private readonly bucketListsService: BucketListsService) {}
}
