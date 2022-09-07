import UserModel from "./user-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) {
  return new UserModel(params);
}

export async function checkUserName(params) {
  return UserModel.exists({ username: params });
}

export async function validateUser(params) {
  return UserModel.find({ username: params.username }).then((collection) => {
    if (collection.length > 1) {
      //TODO: throw error about duplicate usernames in database
      return false;
    }

    if (collection.length < 1) {
      return false;
    }

    return collection[0].password === params.password;
  });
}
