import { Injectable } from '@nestjs/common';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { FormatUtil } from './format.util';

@Injectable()
export class FindUtil {
  constructor(private readonly formatUtil: FormatUtil) {}

  /**
   * 解析查询原始数据
   * @param param0 查询原始数据
   * @returns 解析后的数据
   */
  resolveLastOne<T>({ column_meta: columnMeta, data }: TDengineRestfulResponse): T {
    const [raw] = data;
    if (!raw) return null;

    const result = {} as T;
    for (const [index, [column, type]] of columnMeta.entries()) {
      const columnNameStage1 = this.formatUtil.underlineToSmallHump(column);
      result[columnNameStage1.slice(5, columnNameStage1.length - 1)] = this.formatUtil.getValue(raw[index], type);
    }

    return result;
  }
}
