import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from '../core/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatGateway } from '../websocket/chat.gateway';
import { DEFAULT_PAGE_NUMBER } from '../core/utils/constants';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    private chatGateway: ChatGateway,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto, userId: string): Promise<MessageEntity> {
    const newMsg = this.messageRepository.create({
      ...createMessageDto,
      createdBy: userId,
    });
    const savedMsg = await this.messageRepository.save(newMsg);
    this.chatGateway.sendMessageToAll(savedMsg);

    return savedMsg;
  }

  async getMessages(page: number, pageSize: number): Promise<MessageEntity[]> {
    const skip = (page - DEFAULT_PAGE_NUMBER) * pageSize;
    return await this.messageRepository.find({
      skip,
      take: pageSize,
      order: { createdAt: 'DESC' },
    });
  }

  async getMessage(id: string): Promise<MessageEntity> {
    const foundMessage = await this.messageRepository.findOne({
      where: { id },
    });
    if (!foundMessage) {
      throw new NotFoundException('message not found');
    }
    return foundMessage;
  }

  async deleteMessage(id: string): Promise<Partial<MessageEntity>> {
    const foundMessage = await this.getMessage(id);
    if (!foundMessage) {
      throw new NotFoundException('message not found');
    }

    const deletedMessage = await this.messageRepository.remove(foundMessage);
    return { ...deletedMessage, id };
  }
}
