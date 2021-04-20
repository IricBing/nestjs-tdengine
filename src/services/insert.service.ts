import { HttpService, Injectable } from '@nestjs/common';
import { TDengineResStatus } from '../constants/tdengine.constant';
import { TDengineErrorWrapper } from '../decorators/error-wrapper.decorator';
import { InsertWithSuperTableResponse } from '../interfaces/response/insert/insert-with-super-table.response.interface';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { JSValueType } from '../types';
import { IricUtil } from '../utils/iric.util';

@Injectable()
export class TDengineInsertService {
  constructor(private readonly httpService: HttpService, private readonly iricUtil: IricUtil) {}

  // async insert(database:string,table:string,stable:string)

  @TDengineErrorWrapper()
  async insertWithSuperTable(database: string, stable: string, table: string, tags: JSValueType[], values: JSValueType[]): Promise<InsertWithSuperTableResponse> {
    const sql = `
      INSERT INTO ${database}.${table}
      USING ${database}.${stable}
      TAGS (${tags.map(tag => this.iricUtil.convertJSValue(tag)).join(', ')})
      VALUES (now, ${values.map(value => this.iricUtil.convertJSValue(value)).join(', ')})
    `;

    const { data } = await this.httpService.post<TDengineRestfulResponse>('/rest/sql', sql).toPromise();

    return { success: data.status === TDengineResStatus.Success, data };
  }
}
