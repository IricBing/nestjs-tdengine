# NestJS `TDengine` 驱动插件

注意：<font color="#dd0000">仍在开发中，目前仅在内部使用</font><br /> 

## 使用说明

外部人员仅供参考，请不要用于生产环境，因此导致的事故后果请自行承担。

### 支持环境

* node >=`14.x`
* NestJS >= `7.x`

### 安装

```shell
$ npm i @lantsang/nestjs-tdengine

or
$ yarn add @lantsang/nestjs-tdengine  # 推荐使用yarn
```

### 配置

#### 同步方式

```typescript
import { Module } from '@nestjs/common';
import { TDengineModule } from '@lantsang/nestjs-tdengine'

@Module({
  imports: [
    TDengineModule.forRoot({
      url: 'http://127.0.0.1:6041',
      username: 'root',
      password: 'taosdata'
    }),
  ]
})
export class AppModule { }
```

#### 异步方式

```typescript
import { Module } from '@nestjs/common';
import { TDengineModule } from '@lantsang/nestjs-tdengine'
import { ConfigModule } from './modules/config/config.module';
import { CONFIG_PROVIDER } from './modules/config/constants/config.constant';
import { ConfigService } from './modules/config/services/config.service';

@Module({
  imports: [
    TDengineModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.tdengine.url,
        username: configService.tdengine.username,
        password: configService.tdengine.password
      }),
      inject: [CONFIG_PROVIDER]
    }),
    ConfigModule
  ]
})
export class AppModule {}
```

> 提示：异步注册方式采用的 `ConfigModule` 并不是 `NestJS` 自带的配置功能，而是我基于官方自己设计的一套，具体实现请参考笔记：[NestJS配置模块设计](https://github.com/IricBing/note/blob/master/NodeJS/NestJS/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/%E9%85%8D%E7%BD%AE%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1/README.md)

## 文档地址

* [私有Gitlab](https://gitlab.lantsang.cn/nestjs-plugins/nestjs-tdengine/tree/master/docs)
* [GitHub](https://github.com/lantsang/nestjs-tdengine/tree/master/docs)
* [Gitee](https://gitee.com/lantsang/nestjs-tdengine/tree/master/docs)
