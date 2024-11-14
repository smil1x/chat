import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';
import { CRYPTO_ALGORITHM, CRYPTO_ENCODING } from '../../auth/constants';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  @ApiProperty()
  userId: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'username',
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'role',
    nullable: false,
    unique: true,
    default: 'user',
  })
  @ApiProperty()
  role: string;

  @ApiHideProperty()
  @Exclude()
  @Column({
    type: 'character varying',
    length: 256,
    name: 'pwdHash',
    nullable: false,
  })
  pwdHash: string;

  static getPwdHash(password: string) {
    return crypto
      .createHash(CRYPTO_ALGORITHM)
      .update(password)
      .digest(CRYPTO_ENCODING);
  }
}
