import { DynamicModule, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JWT_EXPIRES_IN } from '../core/utils/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({})
export class WebSocketModule {
  static register(): DynamicModule {
    return {
      module: WebSocketModule,
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRES_IN },
        }),
      ],
      providers: [ChatGateway],
      exports: [ChatGateway],
    };
  }
}
