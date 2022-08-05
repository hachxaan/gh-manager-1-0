import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { InsightsResolver } from './resolvers/get-hotel-insights.resolver';
import { MetricsResolver } from './resolvers/get-hotel-metrics.resolver';
import Symbols from '../../symbols';
import { GeInsightsAdapter } from '../strategies/adapters/getInsights.adapter';
import { GetMetricsAdapter } from '../strategies/adapters/getMetrics.adapter';
import { InsightsService } from '../strategies/services/insights.service';
import { PeriodsBuilder } from '../strategies/resolvers/periods.builder';
import { GetRoomsByRoomTypeService } from '../strategies/services/get-rooms-by-room-type.service';
import { DatabaseModule } from '../database/database.module';
import { ProviderModule } from '../provider/provider.module';
import { CacheModule } from '../redis/cache.module';
import { MetricsService } from '../strategies/services/metrics.service';
import { PingResolver } from './resolvers/get-ping.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './manager.schema.gql',
    }),
    DatabaseModule,
    ProviderModule,
    CacheModule,
    HttpModule,
  ],
  providers: [
    InsightsResolver,
    MetricsResolver,
    PingResolver,
    {
      provide: Symbols.IGetInsights,
      useClass: GeInsightsAdapter,
    },
    {
      provide: Symbols.IGetMetrics,
      useClass: GetMetricsAdapter,
    },
    {
      provide: Symbols.InsightsService,
      useClass: InsightsService,
    },
    {
      provide: Symbols.MetricsService,
      useClass: MetricsService,
    },
    {
      provide: Symbols.PeriodsBuilder,
      useClass: PeriodsBuilder,
    },
    {
      provide: Symbols.GetRoomsByRoomTypeService,
      useClass: GetRoomsByRoomTypeService,
    },
  ],
  exports: [
    InsightsResolver,
    MetricsResolver,
    PingResolver,
    {
      provide: Symbols.IGetInsights,
      useClass: GeInsightsAdapter,
    },
    {
      provide: Symbols.IGetMetrics,
      useClass: GetMetricsAdapter,
    },
  ],
})
export class GrapqlModule {}
