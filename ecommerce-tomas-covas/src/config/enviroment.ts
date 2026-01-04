import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

export const enviroment = {
  HOST: process.env.HOST || 'localhost',
  PORT: Number(process.env.PORT) || 3000,

  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  JWT_SECRET: process.env.JWT_SECRET,
};
