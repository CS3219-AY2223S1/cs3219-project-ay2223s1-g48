import UserModel from './user-model.js';
import 'dotenv/config';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB =
  process.env.ENV == 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) {
  console.log(params);
  return new UserModel(params);
}

export async function checkUserName(params) {
  return UserModel.find({ username: params });
}

export async function checkEmail(params) {
  return UserModel.find({ email: params });
}

export async function updateUser(username, password, newPassword) {
  let user = await UserModel.findOneAndUpdate(
    { username: username },
    { password: newPassword },
    { returnOriginal: false }
  );
  console.log(user);
  return user;
}

export async function checkUserAccount(username, password) {
  return UserModel.exists({ username: username, password: password });
}

export async function deleteUser(username, password) {
  await UserModel.findOneAndDelete({ username: username, password: password });
}
