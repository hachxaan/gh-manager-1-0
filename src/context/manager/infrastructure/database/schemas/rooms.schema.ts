import * as mongoose from 'mongoose';

export const RoomsSchema = new mongoose.Schema({
  hotel_id: Number,
  rooms: JSON,
  //   meta: {
  //     room_id: String,
  //     room_name: String,
  //     room_type: String,
  //   },
});
