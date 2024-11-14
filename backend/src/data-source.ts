import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { MessageEntity, UserEntity } from './core/entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [MessageEntity, UserEntity],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
