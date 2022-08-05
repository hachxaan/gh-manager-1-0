import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRooms } from './interfaces/rooms.interface';
import { RoomsInput } from '../graphql/inputs/rooms_.input_';

@Injectable()
export class DataBaseService {
  private logger: Logger = new Logger(DataBaseService.name);
  constructor(@InjectModel('Rooms') private roomsModel: Model<IRooms>) {}
  async getRooms(hotel_id: number): Promise<any> {
    try {
      return await this.roomsModel.findOne({ hotel_id: hotel_id });
    } catch (except) {
      this.logger.error(except);
    }
  }
  async setRooms(rooms: RoomsInput): Promise<void> {
    try {
      const createdRooms = new this.roomsModel(rooms);
      await createdRooms.save();
    } catch (except) {
      this.logger.error(except);
    }
  }

  async delRooms(hotel_id: number): Promise<void> {
    try {
      await this.roomsModel.deleteOne({ hotel_id: hotel_id });
    } catch (except) {
      this.logger.error(except);
    }
  }
}
