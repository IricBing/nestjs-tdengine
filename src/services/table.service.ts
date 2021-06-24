import { Injectable, HttpService } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { CreateTableResponse } from '../interfaces/response/table/create-table.response.interface';
import { DeleteTableResponse } from '../interfaces/response/table/delete-table.response.interface';
import { FindAllTableResponse } from '../interfaces/response/table/find-all-table.response.interface';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';

@Injectable()
export class TDengineTableService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 创建表
   * @param database 数据库
   * @param name 表
   * @param fieldList 字段列表
   * @param ifNotExists 是否仅在不存在时创建（默认：false）
   * @returns 表创建结果
   */
  @TDengineErrorWrapper()
  async create(database: string, name: string, fieldList: string[][], ifNotExists = false): Promise<CreateTableResponse> {
    const sql = `
      CREATE TABLE ${ifNotExists ? 'IF NOT EXISTS' : ''} 
      ${database}.${name} (ts TIMESTAMP, ${fieldList.map(([field, type]) => `${field} ${type}`).join(', ')})
    `;

    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  @TDengineErrorWrapper()
  async delete(database: string, name: string, ifExists = false): Promise<DeleteTableResponse> {
    const sql = `DROP TABLE ${ifExists ? 'IF EXISTS' : ''} ${database}.${name}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  @TDengineErrorWrapper()
  async findAll(database: string): Promise<FindAllTableResponse> {
    const sql = ` SHOW TABLES;`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  @TDengineErrorWrapper()
  async checkExist(database: string, name: string): Promise<DeleteTableResponse> {
    const sql = `USE ${database}; SHOW TABLES LIKE ${name}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }
}
