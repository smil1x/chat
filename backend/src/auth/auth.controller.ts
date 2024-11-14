import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from '../core/entity';
import { LoginResponse } from './dto';
import { LoginDto } from './dto/login.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User successfully logged in.',
    type: String,
  })
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    const authUser = await this.authService.login(dto);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    return authUser;
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
    type: UserEntity,
  })
  async signup(@Body() dto: LoginDto): Promise<UserEntity> {
    try {
      return await this.authService.signup(dto);
    } catch (e) {
      throw new BadRequestException(e.detail);
    }
  }
}
