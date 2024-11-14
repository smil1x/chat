import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { MessageEntity } from './core/entity';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './core/entity';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class AppModule {
  public static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`,
          isGlobal: true,
        }),
        AuthModule.register(),
        MessageModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [MessageEntity, UserEntity],
          synchronize: false,
          migrationsRun: Boolean(process.env.DB_MIGRATIONS_RUN),
          migrations: ['dist/migrations/*{.ts,.js}'],
        }),
      ],
    };
  }
}
