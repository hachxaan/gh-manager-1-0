/* istanbul ignore file */
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PeriodEnum, RoomTypeEnum } from '../enums/insights.enum';

@InputType()
export class InsightsInput {
  @Field()
  hotel_id: number;
  @Field(() => PeriodEnum)
  period: PeriodEnum;
  @Field(() => RoomTypeEnum)
  room_type: RoomTypeEnum;
  @IsOptional()
  @Field({ nullable: true })
  limit: number;
}
