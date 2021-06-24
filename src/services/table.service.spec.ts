import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../test/app.module';
import { TDengineDatabaseService } from './database.service';
import { TDengineTableService } from './table.service';

describe('TDengineTableService (async)', () => {
  let app: INestApplication;
  let databaseService: TDengineDatabaseService;
  let tableService: TDengineTableService;
  const database = 'database_' + Date.now();
  const tableName = 'table_' + Date.now();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    databaseService = moduleFixture.get(TDengineDatabaseService);
    tableService = moduleFixture.get(TDengineTableService);
    await app.init();
    await databaseService.create(database);
  });

  afterAll(async () => {
    await databaseService.delete(database);
    await app.close();
  });

  it('创建表', async () => {
    const fieldList = [
      ['uuid', 'BINARY(36)'],
      ['antenna_sn', 'BINARY(4)'],
      ['position_uuid', 'BINARY(36)'],
      ['status', 'BINARY(32)'],
      ['change_flag', 'BINARY(32)'],
      ['rf125k', 'TINYINT'],
      ['rf24g', 'TINYINT'],
      ['center_sn', 'BINARY(32)']
    ];

    const { success } = await tableService.create(database, tableName, fieldList);

    expect(success).toBe(true);
  });

  it('获取所有表', async () => {
    const { success } = await tableService.findAll(database);

    expect(success).toBe(true);
  });

  // it('检测表是否存在', async () => {
  //   const { success, error } = await tableService.checkExist(database, tableName);
  //   console.log(error);
  //   expect(success).toBe(true);
  // });

  it('删除存在的表', async () => {
    const { success } = await tableService.delete(database, tableName);
    expect(success).toBe(true);

    const { success: success1, error } = await tableService.delete(database, tableName);
    expect(success1).toBe(false);
    expect(error).toBe('Table does not exist');

    const { success: success2 } = await tableService.delete(database, tableName, true);
    expect(success2).toBe(true);
  });
});
