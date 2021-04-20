import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { CreateDatabaseResponse } from '../interfaces/response/database/create-database.response.interface';
import { GetAllDatabaseResponse } from '../interfaces/response/database/get-all-database.response.interface';

@Injectable()
export class TDengineDatabaseService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 创建TDengine数据库
   * @param database 数据库名称
   * @param keep 数据保留时间，单位：天，默认：10年
   * @returns 创建结果
   */
  @TDengineErrorWrapper()
  async create(database: string, keep = 365 * 10): Promise<CreateDatabaseResponse> {
    const { data } = await this.httpService.post('/rest/sql', `CREATE DATABASE ${database} KEEP ${keep}`).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  /**
   * 删除TDengine数据库
   * @param database 数据库名称
   * @returns 删除结果
   */
  @TDengineErrorWrapper()
  async delete(database: string) {
    const { data } = await this.httpService.post('/rest/sql', `DROP DATABASES ${database}`).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }

  /**
   * 获取TDengine中所有的数据库列表
   * @returns TDengine 数据库列表
   */
  @TDengineErrorWrapper()
  async getAll(): Promise<GetAllDatabaseResponse> {
    const { data } = await this.httpService.post('/rest/sql', `SHOW DATABASES`).toPromise();

    return { success: data.status === TDengineResStatus.Success };
  }
}
