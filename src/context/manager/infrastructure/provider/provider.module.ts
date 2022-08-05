import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import Symbols from '../../symbols';
import { CacheModule } from '../redis/cache.module';
import { PeriodsBuilder } from '../strategies/resolvers/periods.builder';
import AppConfig from '../../../../app.config';
import { ProviderService } from './provider.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, CacheModule, ConfigModule.forFeature(AppConfig)],
  providers: [
    ProviderService,
    {
      provide: Symbols.PeriodsBuilder,
      useClass: PeriodsBuilder,
    },
  ],
  exports: [ProviderService],
})
export class ProviderModule {}
