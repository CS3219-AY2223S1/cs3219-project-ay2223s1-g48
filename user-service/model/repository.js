import UserModel from './user-model.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';

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

export async function updateUser(username, newPassword) {
  let salt = await bcrypt.genSalt(10);
  let encryptedPassword = await bcrypt.hash(newPassword, salt);
  let user = await UserModel.findOneAndUpdate(
    { username: username },
    { password: encryptedPassword },
    { returnOriginal: false }
  );
  console.log(user);
  return user;
}

export async function checkUserAccount(username, password) {
  let account = await checkUserName(username);
  if (account) {
    let passwordMatch = await bcrypt.compare(password, account[0].password);
    return passwordMatch;
  } else {
    return false;
  }
}

export async function deleteUser(username) {
  await UserModel.findOneAndDelete({ username: username });
}
