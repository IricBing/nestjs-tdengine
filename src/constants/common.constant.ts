/** 配置Provider */
export const OPTIONS_PROVIDER = Symbol('OPTIONS_PROVIDER');

/** 方法类型 */
export const enum FunctionType {
  /** 同步 */
  Sync = 'sync',
  /** 异步 */
  Async = 'async'
}
