import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { QueryExecResponse } from '../interfaces/response/query/query-exec.response.interface';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { QueryUtil } from '../utils/query.util';

@Injectable()
export class TDengineQueryService {
  constructor(private readonly httpService: HttpService, private readonly queryUtil: QueryUtil) {}

  /**
   * 执行SQL查询语句
   * @param sql 执行查询的SQL语句
   * @returns SQL执行结果
   */
  @TDengineErrorWrapper()
  async exec<T>(sql: string): Promise<QueryExecResponse<T[]>> {
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success, data: this.queryUtil.resolve<T>(data) };
  }
}
