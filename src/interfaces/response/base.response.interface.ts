export interface BaseResponse<T> {
  /** 操作是否成功 */
  success: boolean;

  /** 成功时返回的数据 */
  data?: T;

  /** 错误时的错误信息 */
  error?: string;
}
