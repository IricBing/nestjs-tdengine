/** TDengine 数据库操作返回状态 */
export const enum TDengineResStatus {
  /** 成功 */
  Success = 'succ',

  /** 失败 */
  Error = 'error'
}

/** TDengine 数据库列类型 */
export const enum TDengineColumnType {
  /** BOOL */
  Bool = 1,
  /** TINYINT */
  TinyInt = 2,
  /** SMALLINT */
  SmallInt = 3,
  /** INT */
  Int = 4,
  /** BIGINT */
  BigInt = 5,
  /** FLOAT */
  Float = 6,
  /** DOUBLE */
  Double = 7,
  /** BINARY */
  Binary = 8,
  /** TIMESTAMP */
  Timestamp = 9,
  /** NCHAR */
  NChar = 10
}
