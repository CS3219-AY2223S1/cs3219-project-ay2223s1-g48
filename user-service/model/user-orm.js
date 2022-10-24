import {
  createUser,
  checkUserName,
  updateUser,
  checkUserAccount,
  deleteUser,
  checkEmail,
} from './repository.js';
import UserModel from './user-model.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, email, password) {
  try {
    const userNameExists = await checkUserName(username);
    const emailExists = await checkEmail(email);
    if (!userNameExists || !emailExists) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      console.log(salt, password);
      const newUser = await createUser({ username, email, password });
      newUser.save();
      return true;
    } else {
      const err = new Error('ERROR: UserName and/or Email already exists');
      console.log(err.message);
      throw err;
    }
  } catch (err) {
    console.log('ERROR: Could not create new user');
    return { err };
  }
}

export async function ormPatchUser(username, password, newPassword) {
  try {
    const match = await checkUserAccount(username, password);
    if (match) {
      const updatedUser = await updateUser(username, password, newPassword);
      updatedUser.save();
      return true;
    } else {
      const err = new Error(
        'ERROR: Account does not exist/username and/or password is incorrect'
      );
      console.log(err.message);
      throw err;
    }
  } catch (err) {
    console.log('ERROR: could not update password');
    return { err };
  }
}

export async function ormDeleteUser(username, password) {
  try {
    const match = await checkUserAccount(username, password);
    if (match) {
      await deleteUser(username, password);
      return true;
    } else {
      const err = new Error(
        'ERROR: Account does not exist/username and/or password is incorrect'
      );
      console.log(err.message);
      throw err;
    }
  } catch (err) {
    console.log('ERROR: could not delete User');
    return { err };
  }
}
export async function validateUser(params) {
  const collection = await UserModel.find({ username: params.username });
  if (collection.length > 1) {
    //TODO: throw error about duplicate usernames in database
    return false;
  }

  if (collection.length < 1) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(
    params.password,
    collection[0].password
  );
  const token = jwt.sign(
    { _id: collection[0]._id },
    process.env.JWT_PRIVATE_KEY
  );
  return isPasswordValid && token;
}
