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
  async searchDestinations(@Query('q') q: string) {
    return this.destinationsService.search(q);
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
