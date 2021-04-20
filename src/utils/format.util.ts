import { Injectable } from '@nestjs/common';

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
}
