import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import Symbols from '../../../symbols';
import { IGetInsights } from 'src/context/manager/domain/adapters/getInsights.interface';
import { InsightsInput } from '../inputs/insights.input';
import { InsightsInputDto } from '../../../domain/dtos/insights-input.dto';
import { InsightsType } from '../dtos/insights.dto';

@Resolver(() => InsightsType)
export class InsightsResolver {
  constructor(
    @Inject(Symbols.IGetInsights)
    private getInsights: IGetInsights,
  ) {}

  @Query(() => [InsightsType])
  async getHotelInsights(
    @Args('input') insightsInput: InsightsInput,
  ): Promise<InsightsType[]> {
    return [
      {
        room: await this.getInsights.get(
          new InsightsInputDto({
            hotel_id: insightsInput.hotel_id,
            period: insightsInput.period,
            room_type: insightsInput.room_type,
            limit: insightsInput.limit,
          }),
        ),
      },
    ];
  }
}
