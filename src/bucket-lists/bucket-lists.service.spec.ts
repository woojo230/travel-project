import { Test, TestingModule } from '@nestjs/testing';
import { BucketListsService } from './bucket-lists.service';

describe('BucketListsService', () => {
  let service: BucketListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BucketListsService],
    }).compile();

    service = module.get<BucketListsService>(BucketListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
