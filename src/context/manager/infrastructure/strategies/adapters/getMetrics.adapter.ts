import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IGetMetrics } from 'src/context/manager/domain/adapters/getMetrics.interface';
import { MetricsInputDto } from 'src/context/manager/domain/dtos/metrics-input.dto';
import Symbols from '../../../symbols';
import { roomType } from '../../graphql/dtos/insights.dto';
import { MetricsService } from '../services/metrics.service';

@Injectable()
export class GetMetricsAdapter implements IGetMetrics {
  constructor(private moduleRef: ModuleRef) {}
  async get(input: MetricsInputDto): Promise<[roomType]> {
    return await this.moduleRef
      .get<MetricsService>(Symbols.MetricsService)
      .build(input);
  }
}
