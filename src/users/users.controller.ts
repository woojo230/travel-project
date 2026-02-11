import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import {
  GetCurrentUser,
  GetCurrentUserId,
} from 'src/common/decorators/get-current-user-id.decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private shieldUserInformation(user: User) {
    return { ...user, password: undefined, refreshToken: undefined };
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getMe(@GetCurrentUserId() userId: string) {
    const user = await this.usersService.findById(userId);
    return this.shieldUserInformation(user);
  }

  @UseGuards(AccessTokenGuard)
  @Put('profile')
  async updateUser(
    @GetCurrentUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(userId, updateUserDto);
    if (!user) {
      throw new NotFoundException('수정할 유저를 찾을 수 없습니다.');
    }
    return this.shieldUserInformation(user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('profile')
  async remove(@GetCurrentUserId() userId: string) {
    return this.usersService.remove(userId);
  }
}
