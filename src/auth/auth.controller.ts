import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import type { Request } from 'express';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import {
  GetCurrentUser,
  GetCurrentUserId,
} from 'src/common/decorators/get-current-user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signOut(@GetCurrentUserId() userId: string) {
    this.authService.signOut(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshAllTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshAllTokens(userId, refreshToken);
  }
}
