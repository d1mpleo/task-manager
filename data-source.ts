// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres', // або 'mysql', залежно від вашої БД
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'your_database',
  entities: ['dist/**/*.entity.js'], // важливо: шлях до скомпільованих entity
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
});