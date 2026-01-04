import { registerAs } from '@nestjs/config';
import { enviroment } from './enviroment';

const config = {
  type: 'postgres',
  database: enviroment.DB_NAME,
  host: enviroment.DB_HOST,
  // host: 'postgresdb',
  port: Number(enviroment.DB_PORT) || 5432,
  username: enviroment.DB_USERNAME,
  password: enviroment.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: false,
  synchronize: true,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);

import { DataSource, DataSourceOptions } from 'typeorm';
export const connectionSource = new DataSource(config as DataSourceOptions);
