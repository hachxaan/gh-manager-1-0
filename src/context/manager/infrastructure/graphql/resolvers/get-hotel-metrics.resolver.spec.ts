import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '../../../../../app.config';
import { ProviderModule } from '../../provider/provider.module';
import { GrapqlModule } from '../graphql.module';
import { RoomTypeEnum } from '../enums/insights.enum';
import { CacheModule } from '../../redis/cache.module';
import { MetricsResolver } from './get-hotel-metrics.resolver';
import { MetricsInput } from '../inputs/metrics.input';

describe('Get Hotel Metrics', () => {
  let metricsResolver: MetricsResolver;

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
      providers: [MetricsResolver],
    }).compile();

    metricsResolver = module.get<MetricsResolver>(MetricsResolver);
  });

  describe('Get Insights', () => {
    it('should return an array rooms', async () => {
      const input = new MetricsInput();
      input.hotel_id = 1;
      input.day = '18/07/2022';
      input.room_type = RoomTypeEnum.business;
      const data = await metricsResolver.getHotelMetrics(input);
      expect(
        (await metricsResolver.getHotelMetrics(input))[0].room[0].metrics,
      ).toMatchObject(data[0].room[0].metrics);
    });
  });
});
