import { TDengineColumnType, TDengineResStatus } from '../../constants/tdengine.constant';

/** 列信息描述 */
type TDengineColumnMetaItem = [string, TDengineColumnType, number];

/** 数据信息 */
type TDengineDataItem = [string | number];

/** TDengine Restful 查询返回类型 */
export interface TDengineRestfulResponse {
  /** 操作结果 */
  status: TDengineResStatus;
  /** 表头定义 */
  head: string[];
  /** 列数据类型 */
  column_meta: TDengineColumnMetaItem[];
  /** 数据结果 */
  data: TDengineDataItem[];
  /** 行数 */
  rows: number;
}
