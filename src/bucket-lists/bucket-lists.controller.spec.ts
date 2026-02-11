import { Test, TestingModule } from '@nestjs/testing';
import { BucketListsController } from './bucket-lists.controller';
import { BucketListsService } from './bucket-lists.service';

describe('BucketListsController', () => {
  let controller: BucketListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BucketListsController],
      providers: [BucketListsService],
    }).compile();

    controller = module.get<BucketListsController>(BucketListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
