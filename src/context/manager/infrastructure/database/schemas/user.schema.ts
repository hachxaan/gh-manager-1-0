import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uuid: String,
  email: String,
  name: String,
  password: String,
  role: String,
});
