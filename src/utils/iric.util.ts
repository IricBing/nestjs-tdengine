import { Injectable } from '@nestjs/common';
import { JSValueType, SQLValueType } from '../types';

@Injectable()
export class IricUtil {
  /**
   * 将错误信息转换为可存储字符串
   * @param error 错误信息
   */
  parseError(error: any): string {
    return typeof error === 'string' || error instanceof String ? `${error}` : JSON.stringify(error) === '{}' ? error.toString() : JSON.stringify(error);
  }

  /**
   * 将JS值转换为SQL值
   * @param value JS 值类型
   * @returns SQL值类型
   */
  convertJSValue(value: JSValueType): SQLValueType {
    if (value === null || value === undefined) return 'null';
    return typeof value === 'string' ? `'${value}'` : value;
  }
}
