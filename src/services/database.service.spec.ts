import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../test/app.module';
import { TDengineDatabaseService } from './database.service';

describe('TDengineDatabaseService (async)', () => {
  let app: INestApplication;
  let databaseService: TDengineDatabaseService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    databaseService = moduleFixture.get(TDengineDatabaseService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('创建数据库', async () => {
    const dbname = 'testdb_' + Date.now();
    const { success } = await databaseService.create(dbname, 365);
    expect(success).toBe(true);

    const { success: success1, error } = await databaseService.create(dbname, 365);
    expect(success1).toBe(false);
    expect(error).toEqual('Database already exists');

    const { success: success2 } = await databaseService.create(dbname, 365, true);
    expect(success2).toBe(true);

    await databaseService.delete(dbname);
  });

  it('删除数据库', async () => {
    const dbname = 'testdb_' + Date.now();
    await databaseService.create(dbname, 365);
    const { success } = await databaseService.delete(dbname);
    expect(success).toBe(true);

    const { success: success2, error } = await databaseService.delete(dbname);
    expect(success2).toBe(false);
    expect(error).toEqual('Invalid database name');

    const { success: success3 } = await databaseService.delete(dbname, true);
    expect(success3).toBe(true);
  });

  it('获取所有数据库', async () => {
    const db1 = 'testdb_' + Date.now() + 1;
    const db2 = 'testdb_' + Date.now() + 2;
    await databaseService.create(db1, 365);
    await databaseService.create(db2, 365);
    const { success, data: databaseList } = await databaseService.getAll();
    expect(success).toBe(true);
    expect(databaseList.length).toBeGreaterThanOrEqual(2);
    await databaseService.delete(db1);
    await databaseService.delete(db2);
  });
});
