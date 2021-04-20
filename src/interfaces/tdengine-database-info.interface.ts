/** TDengine 中数据库信息 */
export interface TDengineDatabaseInfo {
  /** 数据库名称 */
  name: string;
  ntables: number;
  vgroups: number;
  replica: number;
  quorum: number;
  days: number;
  keeps: number[];
  cache: number;
  minrows: number;
  maxrows: number;
  wallevel: number;
  fsync: number;
  comp: number;
  cachelast: number;
  precision: string;
  update: number;
  status: string;
  createdTime: Date;
}
