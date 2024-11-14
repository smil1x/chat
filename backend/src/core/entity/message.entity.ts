import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'messageId',
  })
  @ApiProperty()
  id: string;

  @Column('text', { nullable: false })
  @ApiProperty()
  text: string;

  @Column('character varying', {
    name: 'createdBy',
    nullable: false,
    length: 256,
  })
  @ApiProperty()
  createdBy: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  @ApiProperty()
  createdAt: Date;
}
