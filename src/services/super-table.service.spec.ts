import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../test/app.module';
import { TDengineDatabaseService } from './database.service';
import { TDengineSuperTableService } from './super-table.service';

describe('TDengineSuperTableService (async)', () => {
  let app: INestApplication;
  let databaseService: TDengineDatabaseService;
  let superTableService: TDengineSuperTableService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    databaseService = moduleFixture.get(TDengineDatabaseService);
    superTableService = moduleFixture.get(TDengineSuperTableService);
    await app.init();
    await databaseService.create(database);
  });

  afterAll(async () => {
    await databaseService.delete(database);
    await app.close();
  });

  const database = 'database_' + Date.now();
  const stableName = 'stable_' + Date.now();
  it('创建超级表', async () => {
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
    const tags = [['sn', 'BINARY(4)']];
    const { success } = await superTableService.create(database, stableName, fieldList, tags);
    expect(success).toBe(true);
  });

  // it('删除不存在的超级表', async () => {
  //   const { success, error } = await superTableService.delete(database, 'sts_' + Date.now());
  //   expect(success).toBe(false);
  //   expect(error).toBe('Table does not exist');

  //   const { success: success1, error: error1 } = await superTableService.delete(database, 'de_' + Date.now(), false);
  //   console.log(success1, error1);
  //   expect(success1).toBe(false);
  // });

  it('删除存在的超级表', async () => {
    const { success } = await superTableService.delete(database, stableName);
    expect(success).toBe(true);

    const { success: success1, error } = await superTableService.delete(database, stableName);
    expect(success1).toBe(false);
    expect(error).toBe('Table does not exist');

    const { success: success2 } = await superTableService.delete(database, stableName, true);
    expect(success2).toBe(true);
  });
});
