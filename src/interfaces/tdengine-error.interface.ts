import { TDengineResStatus } from '../constants/tdengine.constant';

/** TDengine 数据库Restful操作错误类型 */
export interface TDengineRestfulError {
  /** 状态 */
  status: TDengineResStatus;
  /** 状态码 */
  code: number;
  /** 错误描述 */
  desc: string;
}
