import 'dotenv/config';

export const envConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT!,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
};
