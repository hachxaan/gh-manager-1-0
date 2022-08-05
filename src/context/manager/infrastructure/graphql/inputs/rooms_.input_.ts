/* istanbul ignore file */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RoomsInput {
  @Field()
  hotel_id: number;
  @Field()
  rooms: string;
}
