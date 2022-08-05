import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from '../dtos/user.dto';
import { IUser } from '../../database/interfaces/user.interface';
import { UserService } from '../services/user.service';
import { UserInput } from '../inputs/user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return await this.userService.findAll();
  }

  @Query(() => [UserType])
  async usersByUuid(uuid: string): Promise<UserType> {
    return await this.userService.findOne(uuid);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput): Promise<UserType> {
    return this.userService.create(input);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
    return this.userService.update(id, input as IUser);
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
