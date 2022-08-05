import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InsightsInputDto } from 'src/context/manager/domain/dtos/insights-input.dto';
import Symbols from '../../../symbols';
import { GetRoomsByRoomTypeService } from './get-rooms-by-room-type.service';
import { ProviderService } from '../../provider/provider.service';
import * as moment from 'moment';
import { roomType } from '../../graphql/dtos/insights.dto';
import { PerdiodDateType, PeriodsBuilder } from '../resolvers/periods.builder';

@Injectable()
export class InsightsService {
  private logger: Logger = new Logger(InsightsService.name);
  constructor(
    private moduleRef: ModuleRef,
    private providerService: ProviderService,
  ) {}

  async build(input: InsightsInputDto): Promise<[roomType]> {
    const requiereDate = (
      date: string,
      datesPeriods: [PerdiodDateType],
    ): boolean => {
      return !!datesPeriods.filter((period) => {
        return moment(date.split('/').reverse().join('-')).isBetween(
          moment(period.start_date).add(-3, 'days'),
          moment(period.end_date),
        );
      }).length;
    };
    const periodsBuilder = this.moduleRef.get<PeriodsBuilder>(
      Symbols.PeriodsBuilder,
    );

    const getRoomsByRoomTypeService =
      this.moduleRef.get<GetRoomsByRoomTypeService>(
        Symbols.GetRoomsByRoomTypeService,
      );

    const rooms = await getRoomsByRoomTypeService.resolve(input.hotel_id);
    const prices = await this.providerService.getPrices(input);

    const rooms_insights = [];
    const datesPeriods = periodsBuilder.getPeriodDates(input.period);

    Object.keys(rooms).map((room_type) => {
      if (input.room_type == room_type)
        Object.keys(rooms[room_type]).map((room_id) => {
          const prices_ok = [];
          Object.keys(prices[room_id]).map((idx_1) => {
            Object.keys(prices[room_id][idx_1]).map((idx_2) => {
              const date = prices[room_id][idx_1][idx_2].date;
              if (requiereDate(date, datesPeriods)) {
                Object.keys(prices[room_id][idx_1][idx_2]).map((key) => {
                  if (key !== 'date') {
                    prices_ok.push({
                      competitor_name: key,
                      currency: prices[room_id][idx_1][idx_2][key].currency,
                      taxes: prices[room_id][idx_1][idx_2][key].tax,
                      amount:
                        prices[room_id][idx_1][idx_2][key].tax +
                        prices[room_id][idx_1][idx_2][key].price,
                      date: date,
                    });
                  }
                });
              }
            });
          });

          rooms_insights.push({
            room_id: room_id,
            room_name: rooms[room_type][room_id].room_name,
            room_type: room_type,
            prices: prices_ok,
            last_updated_at: new Date(),
          });
        });
    });
    return <[roomType]>rooms_insights;
  }
}
