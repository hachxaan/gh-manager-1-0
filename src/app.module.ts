/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GrapqlModule } from './context/manager/infrastructure/graphql/graphql.module';
import { HealthModule } from './context/manager/infrastructure/nest/health/health.module';
import { HttpModule } from '@nestjs/axios';
import AppConfig from './app.config';
import { DatabaseModule } from './context/manager/infrastructure/database/database.module';
import { CacheModule } from './context/manager/infrastructure/redis/cache.module';

@Module({
  imports: [
    ConfigModule.forFeature(AppConfig),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    HttpModule,
    GrapqlModule,
    HealthModule,
    DatabaseModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
