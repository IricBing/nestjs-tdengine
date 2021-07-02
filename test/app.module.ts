import { Module } from '@nestjs/common';
import { TDengineModule } from '../src/tdengine.module';
import { ConfigModule } from './modules/config/config.module';
import { CONFIG_PROVIDER } from './modules/config/constants/config.constant';
import { ConfigService } from './modules/config/services/config.service';

@Module({
  imports: [
    // TDengineModule.forRoot({
    //   url: 'http://127.0.0.1:6041',
    //   username: 'root',
    //   password: 'taosdata',
    //   logging: false
    // }),
    TDengineModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.tdengine.url,
        username: configService.tdengine.username,
        password: configService.tdengine.password,
        logging: configService.tdengine.logging
      }),
      inject: [CONFIG_PROVIDER]
    }),
    ConfigModule
  ]
})
export class AppModule {}
