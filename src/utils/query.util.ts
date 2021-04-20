import { Injectable } from '@nestjs/common';
import { TDengineColumnType } from '../constants/tdengine.constant';
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
        result[this.formatUtil.underlineToSmallHump(column)] = this.getValue(raw[index], type);
      }

      return result;
    });
  }

  /**
   * 获取数据值（按照类型转换为Typescript/Javascript的数据类型）
   * @param value 原始值
   * @param type 数据类型
   * @returns 转换后的数据值
   */
  private getValue(value: string | number, type: TDengineColumnType): string | number | Date | boolean {
    switch (type) {
      case TDengineColumnType.Bool:
        return !!value;
      case TDengineColumnType.TinyInt:
        return value;
      case TDengineColumnType.SmallInt:
        return value;
      case TDengineColumnType.Int:
        return value;
      case TDengineColumnType.BigInt:
        return value;
      case TDengineColumnType.Float:
        return value;
      case TDengineColumnType.Double:
        return value;
      case TDengineColumnType.Binary:
        return value;
      case TDengineColumnType.Timestamp:
        return new Date(value);
      case TDengineColumnType.NChar:
        return value;
      default:
        throw new Error('未知数据类型：' + type);
    }
  }
}
