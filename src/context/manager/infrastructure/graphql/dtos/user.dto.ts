/* istanbul ignore file */
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly uuid?: string;
  @Field()
  readonly email?: string;
  @Field()
  readonly name?: string;
  @Field()
  readonly password?: string;
  @Field()
  readonly role?: string;
}
