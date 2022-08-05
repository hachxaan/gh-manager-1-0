/* istanbul ignore file */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HealthCheckService, TerminusModule } from '@nestjs/terminus';

import AppConfig from '../../../../../app.config';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { HealthController } from './controller/health.controller';

@Module({
  imports: [ConfigModule.forFeature(AppConfig), TerminusModule],
  controllers: [HealthController],
  providers: [HealthCheckService, HealthCheckExecutor],
  exports: [HealthCheckService, HealthCheckExecutor],
})
export class HealthModule {}
