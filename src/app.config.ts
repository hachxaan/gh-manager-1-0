import { registerAs } from '@nestjs/config';

export default registerAs('App', () => {
  return {
    mongo: {
      url: process.env.MONGO_URL,
    },
    redis: {
      url: process.env.REDIS_URL,
      db: parseInt(process.env.REDIS_DB_INDEX),
    },
    provider: {
      url: `${process.env.PROVIDER_HOST}:${process.env.PROVIDER_PORT}`,
      host: process.env.PROVIDER_HOST,
      port: process.env.PROVIDER_PORT,
      db: process.env.PROVIDER_PATH,
    },
  };
});
