/* istanbul ignore file */
import { InputType, Field } from '@nestjs/graphql';
import { RoomTypeEnum } from '../enums/insights.enum';

@InputType()
export class MetricsInput {
  @Field()
  hotel_id: number;
  @Field()
  day: string;
  @Field(() => RoomTypeEnum)
  room_type: RoomTypeEnum;
}
