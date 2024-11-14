import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../core/entity';

export class LoginResponse extends UserEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
