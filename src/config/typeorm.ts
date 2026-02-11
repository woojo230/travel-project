import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
});

console.log('현재 환경:', process.env.NODE_ENV);
console.log('DB 유저명:', process.env.DB_USERNAME);

const config: any = {
  type: 'postgres',
  host: `${process.env.DB_HOST || 'localhost'}`,
  port: parseInt(`${process.env.DB_PORT || '5432'}`, 10),
  username: `${process.env.DB_USERNAME || 'test'}`,
  password: `${process.env.DB_PASSWORD || 'test'}`,
  database: `${process.env.DB_DATABASE || 'bucketlist'}`,
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

if (process.env.NODE_ENV === 'production') {
  config.ssl = true;
  config.extra = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
