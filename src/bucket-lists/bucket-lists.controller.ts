import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BucketListsService } from './bucket-lists.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('bucket-lists')
export class BucketListsController {
  constructor(private readonly bucketListsService: BucketListsService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  async createBucketList(
    @Body() body: CreateBucketListDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.bucketListsService.create(userId, body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  async getBucketLists(@GetCurrentUserId() userId: string) {
    return this.bucketListsService.find(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getBucketListById(
    @GetCurrentUserId() userId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bucketListsService.findById(userId, id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteBucketList(
    @GetCurrentUserId() userId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bucketListsService.remove(userId, id);
  }
}
