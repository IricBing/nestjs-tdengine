import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { CreateDatabaseResponse } from '../interfaces/response/database/create-database.response.interface';
import { DeleteDatabaseResponse } from '../interfaces/response/database/delete-database.response.interface';
import { GetAllDatabaseResponse } from '../interfaces/response/database/get-all-database.response.interface';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { DatabaseUtil } from '../utils/database.util';

@Injectable()
export class TDengineDatabaseService {
  constructor(private readonly httpService: HttpService, private readonly databaseUtil: DatabaseUtil) {}

  /**
   * 创建TDengine数据库
   * @param database 数据库名称
   * @param keep 数据保留时间，单位：天，默认：10年
   * @param ifNotExists 是否仅不存在的时候创建，默认为：否
   * @returns 创建结果
   */
  @TDengineErrorWrapper()
  async create(database: string, keep = 365 * 10, ifNotExists = false): Promise<CreateDatabaseResponse> {
    const sql = `CREATE DATABASE ${ifNotExists ? 'IF NOT EXISTS' : ''} ${database} KEEP ${keep}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  /**
   * 删除TDengine数据库
   * @param database 数据库名称
   * @param ifExists 是否仅存在的时候删除，默认为：否
   * @returns 删除结果
   */
  @TDengineErrorWrapper()
  async delete(database: string, ifExists = false): Promise<DeleteDatabaseResponse> {
    const sql = `DROP DATABASE ${ifExists ? 'IF EXISTS' : ''} ${database}`;
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  /**
   * 获取TDengine中所有的数据库列表
   * @returns TDengine 数据库列表
   */
  @TDengineErrorWrapper()
  async getAll(): Promise<GetAllDatabaseResponse> {
    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', `SHOW DATABASES`).toPromise();

    const databaseList = this.databaseUtil.resolveDatabaseInfoList(data);

    return { success: data.status === TDengineResStatus.Success, data: databaseList };
  }
}
