import { ModuleMetadata, Type } from '@nestjs/common';

/** 同步传入配置 */
export interface TDengineModuleOptions {
  /** TDengine地址 */
  url: string;
  /** 连接用户名 */
  username: string;
  /** 连接密码 */
  password: string;
  /**
   * 是否打印执行sql
   * @default false
   */
  logging?: boolean;
}

export interface TDengineOptionsFactory {
  createMpOptions(): TDengineModuleOptions | Promise<TDengineModuleOptions>;
}

/** 异步传入配置 */
export interface TDengineModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TDengineOptionsFactory>;
  useClass?: Type<TDengineOptionsFactory>;
  useFactory?: (...args: any[]) => TDengineModuleOptions | Promise<TDengineModuleOptions>;
  inject?: any[];
}
