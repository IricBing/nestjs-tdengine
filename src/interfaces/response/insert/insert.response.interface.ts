import { BaseResponse } from '../base.response.interface';
import { TDengineRestfulResponse } from '../tdengine-restful.response.interface';

/** 普通表数据插入返回结果 */
export interface InsertResponse extends BaseResponse<TDengineRestfulResponse> {}
