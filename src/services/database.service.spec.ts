import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '../../test/modules/config/config.module';
import { CONFIG_PROVIDER } from '../../test/modules/config/constants/config.constant';
import { ConfigService } from '../../test/modules/config/services/config.service';
import { TDengineModule } from '../tdengine.module';
import { TDengineDatabaseService } from './database.service';

describe('TDengineDatabaseService (async)', () => {
  let app: INestApplication;
  let databaseService: TDengineDatabaseService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TDengineModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            url: configService.tdengine.url,
            username: configService.tdengine.username,
            password: configService.tdengine.password
          }),
          inject: [CONFIG_PROVIDER]
        }),
        ConfigModule
      ]
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
    await databaseService.delete(dbname);
  });

  it('删除数据库', async () => {
    const dbname = 'testdb_' + Date.now();
    await databaseService.create(dbname, 365);
    const { success } = await databaseService.delete(dbname);
    expect(success).toBe(true);
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
