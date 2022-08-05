import { Document } from 'mongoose';

export interface IRooms extends Document {
  hotel_id: number;
  rooms: JSON;
}
