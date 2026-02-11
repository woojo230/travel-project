import { Test, TestingModule } from '@nestjs/testing';
import { BucketListItemsService } from './bucket-list-items.service';

describe('BucketListItemsService', () => {
  let service: BucketListItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BucketListItemsService],
    }).compile();

    service = module.get<BucketListItemsService>(BucketListItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
