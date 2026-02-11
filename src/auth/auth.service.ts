import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as argon2 from 'argon2';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async hashFn(data: string): Promise<string> {
    return argon2.hash(data);
  }

  private async getTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashFn(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshAllTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('refresh token이 존재하지 않습니다.');
    }

    const isRefreshTokenMatched = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!isRefreshTokenMatched) {
      throw new ForbiddenException('refresh token이 일치하지 않습니다.');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signUp(data: SignUpDto): Promise<any> {
    const existUser = await this.userService.findByUserName(data.username);

    if (existUser) {
      throw new BadRequestException(
        `${data.username}으로 가입된 계정이 존재합니다`,
      );
    }

    // password encryption
    const hashedPassword = await this.hashFn(data.password);
    const newUser = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.userService.findByUserName(data.username);
    if (!user) {
      throw new BadRequestException('사용자를 찾을 수 없습니다');
    }

    const isPasswordMatched = await argon2.verify(user.password, data.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(userId: string) {
    await this.userService.update(userId, {
      refreshToken: null,
    });
  }
}
