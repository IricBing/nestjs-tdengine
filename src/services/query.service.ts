import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { QueryCountResponse } from '../interfaces/response/query/query-count.response.interface';
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

  /**
   * 获取符合条件的数据条数
   * @param database 数据库名称
   * @param table 表名称（超级表、子表、普通表均可）
   * @param condition 查询条件
   * @returns 获取数量sql执行结果
   */
  @TDengineErrorWrapper()
  async count(database: string, table: string, condition: string): Promise<QueryCountResponse> {
    const sql = `SELECT count(*) FROM ${database}.${table} WHERE ${condition}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    const count = this.queryUtil.resolveCount(data);

    return { success: data.status === TDengineResStatus.Success, data: count };
  }
}
