import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '../../../../../app.config';
import { ProviderModule } from '../../provider/provider.module';
import { InsightsResolver } from './get-hotel-insights.resolver';
import { GrapqlModule } from '../graphql.module';
import { InsightsInput } from '../inputs/insights.input';
import { PeriodEnum, RoomTypeEnum } from '../enums/insights.enum';
import { CacheModule } from '../../redis/cache.module';
import { InsightsType } from '../dtos/insights.dto';
import { ICacheData } from 'src/context/manager/domain/adapters/cache-data.interface';
import Symbols from '../../../symbols';
import { DataBaseService } from '../../database/database.service';

describe('Get Hotel Insights', () => {
  let insightsResolver: InsightsResolver;
  let data: InsightsType[];
  const input = new InsightsInput();
  let cacheData: ICacheData;
  let dataBaseService: DataBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule,
        GrapqlModule,
        ProviderModule,
        HttpModule,
        ConfigModule.forFeature(AppConfig),
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
      ],
      providers: [InsightsResolver],
    }).compile();

    insightsResolver = module.get<InsightsResolver>(InsightsResolver);
    cacheData = module.get<ICacheData>(Symbols.ICacheData);
    dataBaseService = module.get<DataBaseService>(DataBaseService);

    input.hotel_id = 1;
    input.period = PeriodEnum.P90;
    input.room_type = RoomTypeEnum.business;
    input.limit = 0;

    await cacheData.flushAll();
    await dataBaseService.delRooms(input.hotel_id);

    data = await insightsResolver.getHotelInsights(input);
  });

  describe('Get Insights from Provider', () => {
    it('should return an array rooms with prices', async () => {
      expect(
        (await insightsResolver.getHotelInsights(input))[0].room[0].prices,
      ).toMatchObject(data[0].room[0].prices);
    });
  });

  describe('Get Insights from Cache', () => {
    it('should return an array rooms with prices', async () => {
      expect(
        (await insightsResolver.getHotelInsights(input))[0].room[0].prices,
      ).toMatchObject(data[0].room[0].prices);
    });
  });

  describe('Get Insights from Database', () => {
    it('should return an array rooms with prices', async () => {
      await cacheData.flushAll();
      expect(
        (await insightsResolver.getHotelInsights(input))[0].room[0].prices,
      ).toMatchObject(data[0].room[0].prices);
    });
  });
});
