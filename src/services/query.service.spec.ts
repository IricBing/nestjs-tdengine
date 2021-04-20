import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '../../test/modules/config/config.module';
import { CONFIG_PROVIDER } from '../../test/modules/config/constants/config.constant';
import { ConfigService } from '../../test/modules/config/services/config.service';
import { TDengineModule } from '../tdengine.module';
import { TDengineDatabaseService } from './database.service';
import { TDengineInsertService } from './insert.service';
import { TDengineQueryService } from './query.service';
import { TDengineSuperTableService } from './super-table.service';
import { v4 as uuid } from 'uuid';

describe('TDengineQueryService (async)', () => {
  let app: INestApplication;
  let databaseService: TDengineDatabaseService;
  let superTableService: TDengineSuperTableService;
  let insertService: TDengineInsertService;
  let queryService: TDengineQueryService;

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
    superTableService = moduleFixture.get(TDengineSuperTableService);
    insertService = moduleFixture.get(TDengineInsertService);
    queryService = moduleFixture.get(TDengineQueryService);
    await app.init();
    await databaseService.create(database);
    const fieldList = [
      ['uuid', 'BINARY(36)'],
      ['antenna_sn', 'BINARY(4)'],
      ['position_uuid', 'BINARY(36)'],
      ['status', 'BINARY(32)'],
      ['change_flag', 'BINARY(32)'],
      ['rf125k', 'TINYINT'],
      ['rf24g', 'TINYINT']
    ];
    const tags = [['sn', 'BINARY(4)']];
    await superTableService.create(database, stableName, fieldList, tags);

    for (const index of [...new Array(10).keys()]) {
      const { success, data } = await insertService.insertWithSuperTable(database, stableName, 'location_sn_553' + index, ['553' + index], [uuid(), '3456', uuid(), 'outRegion', 'enter', 23, 80]);
      expect(success).toBe(true);
      expect(data.rows).toBe(1);
    }
  });

  afterAll(async () => {
    await databaseService.delete(database);
    await app.close();
  });

  const database = 'database_' + Date.now();
  const stableName = 'stable_' + Date.now();

  it('执行SQL查询语句', async () => {
    const sql = `
      SELECT *
      FROM ${database}.${stableName}
    `;
    const { success, data } = await queryService.exec(sql);

    expect(success).toBe(true);
    expect(data.length).toBe(10);
  });
});
