import { FunctionType } from '../constants/common.constant';

/** 错误捕获装饰器传入参数 */
export interface ErrorWrapperParams {
  /** 方法类型 */
  type?: FunctionType;
}
