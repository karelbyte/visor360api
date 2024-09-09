import { registerAs } from '@nestjs/config';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();
export default registerAs('database', () => ({
  type: process.env.DB_PROVIDER,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    requestTimeout: 20000,
  },
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: false, // process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));
