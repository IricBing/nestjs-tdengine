import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './services/config.service';
import { ConfigValidation } from './validations/config.validation';
import { CONFIG_PROVIDER } from './constants/config.constant';
import { TDengineConfigRegister } from './registers/tdengine.register';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: ConfigValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      },
      load: [TDengineConfigRegister]
    })
  ],
  providers: [
    {
      provide: CONFIG_PROVIDER,
      useClass: ConfigService
    }
  ],
  exports: [CONFIG_PROVIDER]
})
export class ConfigModule {}
