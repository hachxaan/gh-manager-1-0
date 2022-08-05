import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '../redis/cache.module';
import { ProviderService } from './provider.service';
import { ProviderModule } from './provider.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '../../../../app.config';

describe('Provider hotels data', () => {
  let providerService: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule,
        ProviderModule,
        HttpModule,
        ConfigModule.forFeature(AppConfig),
        ConfigModule.forRoot({
          envFilePath: ['.env'],
        }),
      ],
      providers: [ProviderService],
    }).compile();

    providerService = module.get<ProviderService>(ProviderService);
  });

  describe('Get Rooms', () => {
    it('should return an array rooms', async () => {
      const data = await providerService.getRooms(1);
      expect(await providerService.getRooms(1)).toMatchObject(data);
    });
  });
});
