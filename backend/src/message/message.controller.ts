import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto, MessagePaginationQuery } from './dto';
import { MessageService } from './message.service';
import { MessageEntity } from '../core/entity';
import { Roles, User } from '../core/decorators';
import { JwtAuthGuard, RolesGuard } from '../core/guards';

@ApiTags('Message')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create new message. Role: admin' })
  @ApiOkResponse({
    description: 'The message has been successfully retrieved',
    type: MessageEntity,
  })
  createMessage(@Body() createMessageDto: CreateMessageDto, @User('sub') userId: string): Promise<MessageEntity> {
    return this.messageService.createMessage(createMessageDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiOkResponse({
    description: 'Messages have been sent successfully',
    type: [MessageEntity],
  })
  getAllObjects(
    @Query()
    query: MessagePaginationQuery,
  ): Promise<MessageEntity[]> {
    const { page, pageSize } = query;
    return this.messageService.getMessages(page, pageSize);
  }

  @Get(':messageId')
  @ApiOperation({ summary: 'Get message' })
  @ApiOkResponse({
    description: 'Message has been sent successfully',
    type: MessageEntity,
  })
  getObject(@Param('messageId', new ParseUUIDPipe({ version: '4' })) id: string): Promise<MessageEntity> {
    return this.messageService.getMessage(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':messageId')
  @ApiOperation({ summary: 'Delete message. Role: admin.' })
  @ApiOkResponse({
    description: 'Message has been deleted successfully',
    type: MessageEntity,
  })
  deleteMessage(@Param('messageId', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Partial<MessageEntity>> {
    return this.messageService.deleteMessage(id);
  }
}
