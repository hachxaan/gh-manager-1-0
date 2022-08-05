import { RoomTypeEnum } from '../../infrastructure/graphql/enums/insights.enum';

export class MetricsInputDto {
  hotel_id: number;
  day: string;
  room_type: RoomTypeEnum;

  constructor({ hotel_id, day, room_type }: MetricsInputDto) {
    this.hotel_id = hotel_id;
    this.day = day;
    this.room_type = room_type;
  }
}
