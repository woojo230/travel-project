import { Test, TestingModule } from '@nestjs/testing';
import { BucketListItemsController } from './bucket-list-items.controller';
import { BucketListItemsService } from './bucket-list-items.service';

describe('BucketListItemsController', () => {
  let controller: BucketListItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BucketListItemsController],
      providers: [BucketListItemsService],
    }).compile();

    controller = module.get<BucketListItemsController>(BucketListItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
