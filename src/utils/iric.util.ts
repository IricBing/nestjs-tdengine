import { Injectable } from '@nestjs/common';

@Injectable()
export class IricUtil {
  /**
   * 将错误信息转换为可存储字符串
   * @param error 错误信息
   */
  parseError(error: any): string {
    return typeof error === 'string' || error instanceof String ? `${error}` : JSON.stringify(error) === '{}' ? error.toString() : JSON.stringify(error);
  }
}
