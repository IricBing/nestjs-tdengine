import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { FindLastOneResponse } from '../interfaces/response/find/find-last-one.response.interface';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { FindUtil } from '../utils/find.util';

@Injectable()
export class TDengineFindService {
  constructor(private readonly httpService: HttpService, private readonly findUtil: FindUtil) {}

  /**
   * 查询表中最后一条记录
   * @param database 数据库名称
   * @param table 表名称（超级表、子表、普通表均可）
   * @returns 最后一条记录
   */
  @TDengineErrorWrapper()
  async lastOne<T>(database: string, table: string): Promise<FindLastOneResponse<T>> {
    const sql = `SELECT last(*) FROM ${database}.${table}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success, data: this.findUtil.resolveLastOne<T>(data) };
  }
}
