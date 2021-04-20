import { TDengineDatabaseInfo } from '../../tdengine-database-info.interface';
import { BaseResponse } from '../base.response.interface';

/** 获取TDengine中所有数据库列表返回结果 */
export interface GetAllDatabaseResponse extends BaseResponse<TDengineDatabaseInfo[]> {}
