import { DynamicModule, Module } from '@nestjs/common';
import { TDengineModuleOptions, TDengineModuleAsyncOptions } from './interfaces/options.interface';
import { TDengineCoreModule } from './tdengine-core.module';

@Module({})
export class TDengineModule {
  /**
   * 同步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRoot(options: TDengineModuleOptions): DynamicModule {
    return {
      module: TDengineModule,
      imports: [TDengineCoreModule.forRoot(options)]
    };
  }

  /**
   * 异步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRootAsync(options: TDengineModuleAsyncOptions): DynamicModule {
    return {
      module: TDengineModule,
      imports: [TDengineCoreModule.forRootAsync(options)]
    };
  }
}
