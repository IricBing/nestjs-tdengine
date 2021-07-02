import { Injectable } from '@nestjs/common';
import { TDengineColumnType } from '../constants/tdengine.constant';

@Injectable()
export class FormatUtil {
  /**
   * 下划线转小驼峰
   * @param raw 下划线格式
   */
  underlineToSmallHump(raw: string): string {
    return raw.replace(/\_(\w)/g, (all, letter: string) => letter.toUpperCase());
  }

  /**
   * 小驼峰转下划线
   * @param raw 小驼峰格式
   */
  smallHumpToUnderline(raw: string): string {
    return raw.replace(/([A-Z])/g, '_$1').toLowerCase();
  }

  /**
   * 获取数据值（按照类型转换为Typescript/Javascript的数据类型）
   * @param value 原始值
   * @param type 数据类型
   * @returns 转换后的数据值
   */
  getValue(value: string | number, type: TDengineColumnType): string | number | Date | boolean {
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
