import AppConfig from '../../../../app.config';
import Symbols from '../../symbols';
import { CacheDataAdapter } from './cache.adapter';
import { CacheService } from './cache.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forFeature(AppConfig)],
  providers: [
    {
      provide: Symbols.ICacheData,
      useClass: CacheDataAdapter,
    },
    {
      provide: Symbols.CacheService,
      useClass: CacheService,
    },
  ],
  exports: [
    {
      provide: Symbols.ICacheData,
      useClass: CacheDataAdapter,
    },
    {
      provide: Symbols.CacheService,
      useClass: CacheService,
    },
  ],
})
export class CacheModule {}
