import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IGetInsights } from 'src/context/manager/domain/adapters/getInsights.interface';
import { InsightsInputDto } from 'src/context/manager/domain/dtos/insights-input.dto';
import Symbols from '../../../symbols';
import { roomType } from '../../graphql/dtos/insights.dto';
import { InsightsService } from '../services/insights.service';

@Injectable()
export class GeInsightsAdapter implements IGetInsights {
  constructor(private moduleRef: ModuleRef) {}
  async get(input: InsightsInputDto): Promise<[roomType]> {
    return await this.moduleRef
      .get<InsightsService>(Symbols.InsightsService)
      .build(input);
  }
}
