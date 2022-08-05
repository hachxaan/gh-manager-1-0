import AppConfig from '../../../../app.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { DataBaseService } from './database.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsSchema } from './schemas/rooms.schema';
import { UserSchema } from './schemas/user.schema';
import { UserService } from '../graphql/services/user.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      async useFactory(config: ConfigType<typeof AppConfig>) {
        return { uri: config.mongo.url };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Rooms', schema: RoomsSchema }]),
    ConfigModule.forFeature(AppConfig),
  ],
  providers: [DataBaseService, UserService],
  exports: [DataBaseService, UserService],
})
export class DatabaseModule {}
