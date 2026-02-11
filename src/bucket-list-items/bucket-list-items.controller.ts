import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BucketListItemsService } from './bucket-list-items.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { CreateBucketListItemDto } from './dto/create-bucket-list-item.dto';
import { UpdateBucketListItemDto } from './dto/update-bucket-list-item.dto';

@Controller('bucket-lists')
export class BucketListItemsController {
  constructor(
    private readonly bucketListItemsService: BucketListItemsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('/:bucketListId/items')
  async createBucketListItem(
    @GetCurrentUserId() userId: string,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Body() createBucketListItemDto: CreateBucketListItemDto,
  ) {
    return this.bucketListItemsService.create(
      userId,
      bucketListId,
      createBucketListItemDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:bucketListId/items')
  async findAllBucketListItems(
    @GetCurrentUserId() userId: string,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
  ) {
    return this.bucketListItemsService.findAll(userId, bucketListId);
  }

  @Patch('/:bucketListId/items/:itemId')
  @UseGuards(AccessTokenGuard)
  async updateBucketListItem(
    @GetCurrentUserId() userId: string,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateBucketListItemDto: UpdateBucketListItemDto,
  ) {
    return this.bucketListItemsService.update(
      userId,
      bucketListId,
      itemId,
      updateBucketListItemDto,
    );
  }

  @Delete('/:bucketListId/items/:itemId')
  @UseGuards(AccessTokenGuard)
  async removeBucketListItem(
    @GetCurrentUserId() userId: string,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.bucketListItemsService.remove(userId, bucketListId, itemId);
  }
}
