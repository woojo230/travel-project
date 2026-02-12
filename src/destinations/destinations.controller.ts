import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { SearchDto } from './dto/search-destination.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post('')
  async createDestination(@Body() body: CreateDestinationDto) {
    return this.destinationsService.create(body);
  }

  @Get('')
  async findAllDestinations() {
    return this.destinationsService.findAll();
  }

  @Get('search')
  @CacheKey('search')
  @CacheTTL(1000 * 10)
  async searchDestinations(@Query() query: SearchDto) {
    return this.destinationsService.search(query.q);
  }

  @Get(':id')
  async findDestinationByIs(@Param('id', ParseIntPipe) id: number) {
    return this.destinationsService.findById(id);
  }

  @Delete(':id')
  async removeDestination(@Param('id', ParseIntPipe) id: number) {
    return this.destinationsService.remove(id);
  }
}
