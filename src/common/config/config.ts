import { config } from 'dotenv';
config();

export const configs = {
  PORT: process.env.PORT || 3000,

  DATABASE_URL: process.env.DATABASE_URL || 'base',

  SECRET: process.env.SECRET || 'Secret',

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
  AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
  AWS_S3_BUCKET_ACL: process.env.AWS_S3_BUCKET_ACL,
};
