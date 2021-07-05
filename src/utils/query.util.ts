import { Injectable } from '@nestjs/common';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { FormatUtil } from './format.util';

@Injectable()
export class QueryUtil {
  constructor(private readonly formatUtil: FormatUtil) {}

  /**
   * 解析查询原始数据
   * @param param0 查询原始数据
   * @returns 解析后的数据
   */
  resolve<T>({ column_meta: columnMeta, data }: TDengineRestfulResponse): T[] {
    return data.map(raw => {
      const result = {} as T;
      for (const [index, [column, type]] of columnMeta.entries()) {
        result[this.formatUtil.underlineToSmallHump(column)] = this.formatUtil.getValue(raw[index], type);
      }

      return result;
    });
  }

  /**
   * 解析count方法查询原始数据
   * @param param0 查询原始数据
   * @returns 数量
   */
  resolveCount({ column_meta: columnMeta, data }: TDengineRestfulResponse): number {
    const [raw] = data;
    for (const [index, [column, type]] of columnMeta.entries()) {
      if (this.formatUtil.underlineToSmallHump(column).startsWith('count')) {
        return this.formatUtil.getValue(raw[index], type) as number;
      }
    }

    return 0;
  }
}
