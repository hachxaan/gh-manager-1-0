import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Id } from '../../../domain/shared/id';
import { DatabaseModule } from '../../database/database.module';
import { UserInput } from '../inputs/user.input';
import { UserResolver } from './user.resolver';
import AppConfig from '../../../../../app.config';

describe('User CRUD', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forFeature(AppConfig),
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
      ],
      providers: [UserResolver],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  describe('Create and Update User', () => {
    it('should create and update user', async () => {
      const input = new UserInput();
      input.uuid = Id.of().getValue();
      input.name = 'User Test';
      input.email = 'email.test@domain.com';
      input.password = 'not.secure.test';
      input.role = 'admin';
      await userResolver.createUser(input);
      const user = await userResolver.usersByUuid(input.uuid);
      const uuid = user['uuid'];
      const id = user['_id'];
      input.name = 'User Test 2';
      await userResolver.updateUser(id, input);
      await userResolver.deleteUser(id);
      expect(uuid).toEqual(input.uuid);
    });
  });

  describe('Find All User', () => {
    it('should return an array of users', async () => {
      const input = new UserInput();
      input.uuid = Id.of().getValue();
      input.name = 'User Test';
      input.email = 'email.test@domain.com';
      input.password = 'not.secure.test';
      input.role = 'admin';
      await userResolver.createUser(input);
      const user = await userResolver.usersByUuid(input.uuid);
      const id = user['_id'];
      const data = await userResolver.users();
      expect(await userResolver.users()).toMatchObject(data);
      await userResolver.deleteUser(id);
    });
  });
});
