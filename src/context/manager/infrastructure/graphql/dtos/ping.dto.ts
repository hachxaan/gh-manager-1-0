/* istanbul ignore file */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PingType {
  @Field()
  db?: string;
  @Field()
  local_api?: string;
  @Field()
  local_cache?: string;
  @Field()
  external_api?: string;
}
