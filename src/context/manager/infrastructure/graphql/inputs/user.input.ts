/* istanbul ignore file */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  uuid: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  role: string;
}
