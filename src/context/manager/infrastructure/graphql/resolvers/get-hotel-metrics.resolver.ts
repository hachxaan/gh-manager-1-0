import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import Symbols from '../../../symbols';
import { MetricsType } from '../dtos/metrics.dto';
import { MetricsInput } from '../inputs/metrics.input';
import { MetricsInputDto } from '../../../domain/dtos/metrics-input.dto';
import { IGetMetrics } from 'src/context/manager/domain/adapters/getMetrics.interface';

@Resolver(() => MetricsType)
export class MetricsResolver {
  constructor(
    @Inject(Symbols.IGetMetrics)
    private getMetrics: IGetMetrics,
  ) {}

  @Query(() => [MetricsType])
  async getHotelMetrics(
    @Args('input') metricsInput: MetricsInput,
  ): Promise<MetricsType[]> {
    return [
      {
        room: await this.getMetrics.get(
          new MetricsInputDto({
            hotel_id: metricsInput.hotel_id,
            day: metricsInput.day,
            room_type: metricsInput.room_type,
          }),
        ),
      },
    ];
  }
}
