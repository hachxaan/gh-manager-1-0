/* istanbul ignore file */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class BestPriceType {
  @Field()
  competitor_name?: string;
  @Field()
  gross_amount?: number;
  @Field()
  net_amount?: number;
}

@ObjectType()
class AveragePriceType {
  @Field()
  competitor_name?: string;
  @Field()
  gross_amount?: number;
  @Field()
  net_amount?: number;
}

@ObjectType()
class WorstPriceType {
  @Field()
  competitor_name?: string;
  @Field()
  gross_amount?: number;
  @Field()
  net_amount?: number;
}

@ObjectType()
class metricsType {
  @Field(() => BestPriceType)
  best_price?: BestPriceType;
  @Field(() => AveragePriceType)
  average_price?: AveragePriceType;
  @Field(() => WorstPriceType)
  worst_price?: WorstPriceType;
}

@ObjectType()
export class roomMetricsType {
  @Field()
  room_id?: string;
  @Field()
  room_name?: string;
  @Field()
  date?: string;
  @Field(() => metricsType)
  metrics?: metricsType;
}

@ObjectType()
export class MetricsType {
  @Field(() => [roomMetricsType])
  readonly room?: [roomMetricsType];
}
