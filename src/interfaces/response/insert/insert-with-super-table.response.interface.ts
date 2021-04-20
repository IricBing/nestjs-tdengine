import { BaseResponse } from '../base.response.interface';
import { TDengineRestfulResponse } from '../tdengine-restful.response.interface';

/** 基于超级表的数据插入返回结果 */
export interface InsertWithSuperTableResponse extends BaseResponse<TDengineRestfulResponse> {}
