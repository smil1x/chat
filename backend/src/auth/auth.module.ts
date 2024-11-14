import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../core/entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JWT_EXPIRES_IN, SECRET_KEY } from '../core/utils/constants';

@Module({})
export class AuthModule {
  static register(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRES_IN },
        }),
        PassportModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    };
  }
}
