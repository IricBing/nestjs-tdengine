import { Injectable } from '@nestjs/common';
import { TDengineRestfulResponse } from '../interfaces/response/tdengine-restful.response.interface';
import { TDengineDatabaseInfo } from '../interfaces/tdengine-database-info.interface';

@Injectable()
export class DatabaseUtil {
  /**
   * 解析数据库信息列表
   * @param param0 获取数据库列表返回信息
   * @returns 数据库列表
   */
  resolveDatabaseInfoList({ column_meta: columnMeta, data }: TDengineRestfulResponse): TDengineDatabaseInfo[] {
    if (!data?.length) return [];

    return data.map(raw => {
      return ({
        name: raw[columnMeta.findIndex(([volumn]) => volumn === 'name')],
        ntables: raw[columnMeta.findIndex(([volumn]) => volumn === 'ntables')],
        vgroups: raw[columnMeta.findIndex(([volumn]) => volumn === 'vgroups')],
        replica: raw[columnMeta.findIndex(([volumn]) => volumn === 'replica')],
        quorum: raw[columnMeta.findIndex(([volumn]) => volumn === 'quorum')],
        days: raw[columnMeta.findIndex(([volumn]) => volumn === 'days')],
        keeps: (raw[columnMeta.findIndex(([volumn]) => volumn.startsWith('keep'))] as string).split(',').map(keep => parseInt(keep)),
        cache: raw[columnMeta.findIndex(([volumn]) => volumn.startsWith('cache'))],
        minrows: raw[columnMeta.findIndex(([volumn]) => volumn === 'minrows')],
        maxrows: raw[columnMeta.findIndex(([volumn]) => volumn === 'maxrows')],
        wallevel: raw[columnMeta.findIndex(([volumn]) => volumn === 'wallevel')],
        fsync: raw[columnMeta.findIndex(([volumn]) => volumn === 'fsync')],
        comp: raw[columnMeta.findIndex(([volumn]) => volumn === 'comp')],
        cachelast: raw[columnMeta.findIndex(([volumn]) => volumn === 'cachelast')],
        precision: raw[columnMeta.findIndex(([volumn]) => volumn === 'precision')],
        update: raw[columnMeta.findIndex(([volumn]) => volumn === 'update')],
        status: raw[columnMeta.findIndex(([volumn]) => volumn === 'status')],
        createdTime: new Date(raw[columnMeta.findIndex(([volumn]) => volumn === 'created_time')])
      } as unknown) as TDengineDatabaseInfo;
    });
  }
}
