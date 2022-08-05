import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';
import { PingResolver } from './get-ping.resolver';

describe('Get Ping', () => {
  let pingResolver: PingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PingResolver],
    }).compile();

    pingResolver = module.get<PingResolver>(PingResolver);
  });

  describe('Ping services', () => {
    it('should return status from services', async () => {
      const result = {
        db: 'up',
        local_api: 'up',
        local_cache: 'up',
        external_api: 'up',
      };
      expect(await pingResolver.ping()).toEqual(result);
    });
  });
});
