/* istanbul ignore file */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class pricesType {
  @Field()
  competitor_name?: string;
  @Field()
  currency?: string;
  @Field()
  taxes?: number;
  @Field()
  amount?: number;
  @Field()
  date?: string;
}

@ObjectType()
export class roomType {
  @Field()
  room_id?: string;
  @Field()
  room_name?: string;
  @Field()
  room_type?: string;
  @Field(() => [pricesType])
  prices?: [pricesType];
  @Field()
  last_updated_at?: string;
}

@ObjectType()
export class InsightsType {
  @Field(() => [roomType])
  readonly room?: [roomType];
}
