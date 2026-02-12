import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationsRepository: Repository<Destination>,
  ) {}

  async create(model: CreateDestinationDto): Promise<Destination> {
    const existingDestination = await this.destinationsRepository.findOneBy({
      name: model.name,
    });

    if (existingDestination) {
      throw new BadRequestException('이미 존재하는 여행지 입니다');
    }

    const destination = this.destinationsRepository.create({
      ...model,
    });

    const createdDestination =
      await this.destinationsRepository.save(destination);

    return createdDestination;
  }

  async findAll(): Promise<Destination[]> {
    return this.destinationsRepository.find();
  }

  async findById(id: number) {
    return this.destinationsRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    const existingDestination = await this.findById(id);

    if (!existingDestination) {
      throw new NotFoundException('존재하지 않는 여행지 입니다.');
    }

    await this.destinationsRepository.delete(id);
  }

  async search(q: string): Promise<Destination[]> {
    const results = await this.destinationsRepository.find({
      where: {
        name: Like(`%${q}%`),
      },
    });

    if (results.length === 0) {
      throw new NotFoundException(
        `'${q}'에 해당하는 목적지를 찾을 수 없습니다.`,
      );
    }

    return results;
  }
}
