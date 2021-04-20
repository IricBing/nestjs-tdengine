import * as Joi from 'joi';

/** .env文件校验 */
export const ConfigValidation = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging').default('development'),

  // TDengine 配置信息
  TDENGINE_URL: Joi.string().required(),
  TDENGINE_USERNAME: Joi.string().required(),
  TDENGINE_PASSWORD: Joi.string().required()
});
