import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import Symbols from '../../../symbols';
import { GetRoomsByRoomTypeService } from './get-rooms-by-room-type.service';
import { roomType } from '../../graphql/dtos/insights.dto';
import { MetricsInputDto } from 'src/context/manager/domain/dtos/metrics-input.dto';
import { ProviderService } from '../../provider/provider.service';

type DataMetrics = {
  competitor_name;
  gross_amount;
  net_amount;
};

type MetricsType = {
  best_price: DataMetrics;
  average_price: DataMetrics;
  worst_price: DataMetrics;
};

@Injectable()
export class MetricsService {
  private logger: Logger = new Logger(MetricsService.name);
  constructor(
    private moduleRef: ModuleRef,
    private providerService: ProviderService,
  ) {}

  async build(input: MetricsInputDto): Promise<[roomType]> {
    const getRoomsByRoomTypeService =
      this.moduleRef.get<GetRoomsByRoomTypeService>(
        Symbols.GetRoomsByRoomTypeService,
      );

    const rooms = await getRoomsByRoomTypeService.resolve(input.hotel_id);
    const prices = await this.providerService.getPricesMetrics(input);
    const rooms_metrics = [];

    Object.keys(rooms).map((room_type) => {
      if (input.room_type == room_type)
        Object.keys(rooms[room_type]).map((room_id) => {
          const metrics = <MetricsType>{
            best_price: <DataMetrics>{
              competitor_name: null,
              gross_amount: 0,
              net_amount: 0,
            },
            average_price: <DataMetrics>{
              competitor_name: null,
              gross_amount: 0,
              net_amount: 0,
            },
            worst_price: <DataMetrics>{
              competitor_name: null,
              gross_amount: 0,
              net_amount: 0,
            },
          };
          Object.keys(prices[room_id]).map((idx_1) => {
            Object.keys(prices[room_id][idx_1]).map((idx_2) => {
              const date = prices[room_id][idx_1][idx_2].date;
              if (date == input.day) {
                Object.keys(prices[room_id][idx_1][idx_2]).map((key) => {
                  if (key !== 'date') {
                    const priceValue = prices[room_id][idx_1][idx_2][key].price;
                    const taxValue = prices[room_id][idx_1][idx_2][key].tax;
                    if (!metrics.best_price.competitor_name) {
                      metrics.best_price = {
                        competitor_name: key,
                        gross_amount: taxValue + priceValue,
                        net_amount: priceValue,
                      };
                    } else {
                      if (metrics.best_price.net_amount > priceValue)
                        metrics.best_price = {
                          competitor_name: key,
                          gross_amount: taxValue + priceValue,
                          net_amount: priceValue,
                        };
                    }

                    if (!metrics.average_price.competitor_name) {
                      metrics.average_price = {
                        competitor_name: key,
                        gross_amount: taxValue + priceValue,
                        net_amount: priceValue,
                      };
                    } else {
                      if (
                        metrics.worst_price.net_amount > priceValue &&
                        metrics.best_price.net_amount < priceValue
                      )
                        metrics.average_price = {
                          competitor_name: key,
                          gross_amount: taxValue + priceValue,
                          net_amount: priceValue,
                        };
                    }

                    if (!metrics.worst_price.competitor_name) {
                      metrics.worst_price = {
                        competitor_name: key,
                        gross_amount: taxValue + priceValue,
                        net_amount: priceValue,
                      };
                    } else {
                      if (metrics.worst_price.net_amount < priceValue)
                        metrics.worst_price = {
                          competitor_name: key,
                          gross_amount: taxValue + priceValue,
                          net_amount: priceValue,
                        };
                    }
                  }
                });
              }
            });
          });
          rooms_metrics.push({
            room_id: room_id,
            room_name: rooms[room_type][room_id].room_name,
            date: input.day,
            metrics: metrics,
          });
        });
    });
    return <[roomType]>rooms_metrics;
  }
}
