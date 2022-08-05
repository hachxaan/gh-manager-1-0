import {
  PeriodEnum,
  RoomTypeEnum,
} from '../../infrastructure/graphql/enums/insights.enum';

export class InsightsInputDto {
  hotel_id: number;
  period: PeriodEnum;
  room_type: RoomTypeEnum;
  limit: number;

  constructor({ hotel_id, period, room_type, limit }: InsightsInputDto) {
    this.hotel_id = hotel_id;
    this.period = period;
    this.room_type = room_type;
    this.limit = limit;
  }
}
