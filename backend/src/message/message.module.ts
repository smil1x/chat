import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../core/entity';
import { WebSocketModule } from '../websocket/websocket.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), WebSocketModule.register()],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
