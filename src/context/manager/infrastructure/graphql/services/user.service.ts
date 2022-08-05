import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id } from '../../../domain/shared/id';

import { IUser } from '../../database/interfaces/user.interface';
import { UserType } from '../dtos/user.dto';
import { UserInput } from '../inputs/user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(userDto: UserInput): Promise<UserType> {
    const id = userDto.uuid || Id.of().getValue();
    const userData = { ...userDto, uuid: id };
    const createdItem = new this.userModel(userData);
    return await createdItem.save();
  }

  async findAll(): Promise<UserType[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserType> {
    return await this.userModel.findOne({ uuid: id });
  }

  async delete(id: string): Promise<UserType> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: IUser): Promise<UserType> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
