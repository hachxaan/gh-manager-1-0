import { Document } from 'mongoose';

export interface IUser extends Document {
  uuid: string;
  email: string;
  name: string;
  password: string;
  role: string;
}
