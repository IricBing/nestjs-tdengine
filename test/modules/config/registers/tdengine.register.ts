import { registerAs } from '@nestjs/config';

export const TDengineConfigRegister = registerAs('tdengine', () => ({
  url: process.env.TDENGINE_URL,
  username: process.env.TDENGINE_USERNAME,
  password: process.env.TDENGINE_PASSWORD,
  logging: process.env.TDENGINE_LOGGING === 'true' ? true : false
}));
