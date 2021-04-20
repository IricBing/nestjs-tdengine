import { DynamicModule, Global, HttpModule, Module, Provider } from '@nestjs/common';
import { OPTIONS_PROVIDER } from './constants/common.constant';
import { TDengineModuleAsyncOptions, TDengineModuleOptions, TDengineOptionsFactory } from './interfaces/options.interface';
import { TDengineDatabaseService } from './services/database.service';
import { TDengineInsertService } from './services/insert.service';
import { TDengineQueryService } from './services/query.service';
import { TDengineSuperTableService } from './services/super-table.service';
import { DatabaseUtil } from './utils/database.util';
import { FormatUtil } from './utils/format.util';
import { IricUtil } from './utils/iric.util';
import { QueryUtil } from './utils/query.util';

@Global()
@Module({})
export class TDengineCoreModule {
  /**
   * 同步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRoot(options: TDengineModuleOptions): DynamicModule {
    return {
      module: TDengineCoreModule,
      imports: [
        HttpModule.register({
          baseURL: options.url,
          auth: {
            username: options.username,
            password: options.password
          }
        })
      ],
      providers: [
        TDengineDatabaseService,
        TDengineSuperTableService,
        TDengineQueryService,
        TDengineInsertService,
        IricUtil,
        DatabaseUtil,
        QueryUtil,
        FormatUtil,
        { provide: OPTIONS_PROVIDER, useValue: options }
      ],
      exports: [TDengineDatabaseService, TDengineSuperTableService, TDengineQueryService, TDengineInsertService]
    };
  }

  /**
   * 异步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRootAsync(options: TDengineModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: TDengineCoreModule,
      imports: [
        ...(options.imports || []),
        HttpModule.registerAsync({
          useFactory: (options: TDengineModuleOptions) => ({
            baseURL: options.url,
            auth: {
              username: options.username,
              password: options.password
            }
          }),
          inject: [OPTIONS_PROVIDER]
        })
      ],
      providers: [...asyncProviders, TDengineDatabaseService, TDengineSuperTableService, TDengineQueryService, TDengineInsertService, IricUtil, DatabaseUtil, QueryUtil, FormatUtil],
      exports: [OPTIONS_PROVIDER, TDengineDatabaseService, TDengineSuperTableService, TDengineQueryService, TDengineInsertService]
    };
  }

  /**
   * 创建异步Provider列表
   * @param options 异步配置
   * @returns Provider列表
   */
  private static createAsyncProviders(options: TDengineModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass
      }
    ];
  }

  /**
   * 创建异步Provider
   * @param options 异步配置
   * @returns Provider
   */
  private static createAsyncOptionsProvider(options: TDengineModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: OPTIONS_PROVIDER,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    const inject = [options.useClass || options.useExisting];
    return {
      provide: OPTIONS_PROVIDER,
      useFactory: async (optionsFactory: TDengineOptionsFactory) => await optionsFactory.createMpOptions(),
      inject
    };
  }
}
