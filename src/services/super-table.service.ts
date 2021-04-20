import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { CreateSuperTableResponse } from '../interfaces/response/super-table/create-super-table.response.interface';
import { DeleteSuperTableResponse } from '../interfaces/response/super-table/delete-super-table.response.interface';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';

@Injectable()
export class TDengineSuperTableService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 创建超级表
   * @param database 数据库名称
   * @param name 超级表名称
   * @param fieldList 字段列表，不要写**timestamp**字段，框架已经自动在列表最前面插入了此字段。
   * @param tags tag列表
   * @param ifNotExists 是否仅在**不存在此表的时候创建**，默认为：否
   * @returns 超级表创建结果
   */
  @TDengineErrorWrapper()
  async create(database: string, name: string, fieldList: string[][], tags: string[][], ifNotExists = false): Promise<CreateSuperTableResponse> {
    const sql = `
      CREATE STABLE ${ifNotExists ? 'IF NOT EXISTS' : ''} 
      ${database}.${name} (ts TIMESTAMP, ${fieldList.map(([field, type]) => `${field} ${type}`).join(', ')})
      TAGS (${tags.map(([tag, type]) => `${tag} ${type}`).join(',')})
    `;

    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  /**
   * 删除超级表
   * @param database 数据库名称
   * @param name 超级表名称
   * @param ifExists 是否仅在超级表存在的情况下执行删除，默认为：否
   * @returns 超级表删除结果
   */
  @TDengineErrorWrapper()
  async delete(database: string, name: string, ifExists = false): Promise<DeleteSuperTableResponse> {
    const sql = `DROP STABLE ${ifExists ? 'IF EXISTS' : ''} ${database}.${name}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }
}
