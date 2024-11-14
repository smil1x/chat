import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DEFAULT_LIMIT_NUMBER, DEFAULT_PAGE_NUMBER, MAX_LIMIT_NUMBER } from '../../core/utils/constants';

export class MessagePaginationQuery {
  @ApiProperty({
    description: 'how many rows to skip',
    default: DEFAULT_PAGE_NUMBER,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = DEFAULT_PAGE_NUMBER;

  @ApiProperty({
    description: 'number of messages per page',
    maximum: MAX_LIMIT_NUMBER,
    default: DEFAULT_LIMIT_NUMBER,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_LIMIT_NUMBER)
  pageSize: number = DEFAULT_LIMIT_NUMBER;
}
