import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../core/entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const pwdHash = UserEntity.getPwdHash(dto.password);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.pwdHash = :pwdHash', { pwdHash })
      .andWhere('user.username = :username', { username: dto.username })
      .getOne();
    if (!user) {
      return null;
    }

    const { userId, ...payload } = Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'pwdHash')); // remove pwdHash from user

    const token = this.jwtService.sign({ sub: userId, ...payload });
    return { userId, ...(payload as Omit<UserEntity, 'pwdHash' & 'userId'>), token };
  }

  async signup(dto: LoginDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      username: dto.username,
      pwdHash: UserEntity.getPwdHash(dto.password),
    });

    return this.userRepository.save(newUser);
  }
}
