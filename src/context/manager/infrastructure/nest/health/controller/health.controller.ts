/* istanbul ignore file */
import { ConfigType } from '@nestjs/config';
import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { RedisOptions } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

import AppConfig from '../../../../../../app.config';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    @Inject(AppConfig.KEY)
    private configService: ConfigType<typeof AppConfig>,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('db'),
      () =>
        this.http.pingCheck(
          'local_api',
          'http://127.0.0.1:3000/api/v1/health/ping',
        ),
      () =>
        this.microservice.pingCheck<RedisOptions>('local_cache', {
          transport: this.configService.redis.db,
          options: {
            url: this.configService.redis.url,
          },
        }),
      () =>
        this.http.pingCheck(
          'external_api',
          `${this.configService.provider.url}/ping`,
        ),
    ]);
  }

  @Get('/ping')
  @HealthCheck()
  async ping(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }
}
