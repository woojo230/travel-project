import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BucketList } from './entities/bucketList.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';

@Injectable()
export class BucketListsService {
  constructor(
    @InjectRepository(BucketList)
    private readonly bucketListRepository: Repository<BucketList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    model: CreateBucketListDto,
  ): Promise<BucketList> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('유저를 조회하지 못했습니다');
    }

    const existingBucketList = await this.bucketListRepository.findOne({
      where: {
        name: model.name,
        user: {
          id: userId,
        },
      },
    });

    if (existingBucketList) {
      throw new BadRequestException('이미 존재하는 버킷리스트 입니다.');
    }

    const newBucketList = await this.bucketListRepository.create({
      ...model,
      user,
    });

    await this.bucketListRepository.save(newBucketList);

    return { ...newBucketList };
  }

  async findById(userId: string, id: number): Promise<BucketList> {
    const bucketList = await this.bucketListRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!bucketList) {
      throw new NotFoundException('존재하지 않는 리스트입니다');
    }

    return bucketList;
  }

  async find(userId: string): Promise<BucketList[]> {
    return this.bucketListRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async remove(userId: string, id: number): Promise<void> {
    const bucketList = await this.findById(userId, id);
    if (!bucketList) {
      throw new BadRequestException('버킷리스트를 찾지 못했습니다.');
    }
    await this.bucketListRepository.remove(bucketList);
  }
}
