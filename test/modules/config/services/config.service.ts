import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  /** TDengine配置相关信息 */
  get tdengine() {
    return {
      /** TDengine 数据库地址 */
      url: this.nestConfigService.get<string>('tdengine.url'),
      /** 用户名 */
      username: this.nestConfigService.get<string>('tdengine.username'),
      /** 密码 */
      password: this.nestConfigService.get<string>('tdengine.password')
    };
  }
}
