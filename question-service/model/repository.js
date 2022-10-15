import QuestionModel from './question-model.js';
import 'dotenv/config';

import mongoose from 'mongoose';

let mongoDB =
  process.env.ENV == 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createQuestion(params) {
  console.log(params);
  let paramDifficulty = params.difficulty;
  let question = params.question;
  return new QuestionModel({
    difficulty: paramDifficulty,
    question: question,
  });
}

export async function getQuestion(difficulty) {
  let question = await QuestionModel.aggregate([
    { $match: { difficulty: difficulty } },
    { $sample: { size: 1 } },
  ]);
  return question;
}

export async function getAllQuestion() {
  let questions = await QuestionModel.find();
  return questions;
}

export async function deleteQuestion(id) {
  console.log('deleting question');
  await QuestionModel.remove({
    _id: id,
  });
}

export async function viewQuestion(id) {
  let question = await QuestionModel.findById(id);
  return question;
}

export async function updateQuestion(id, difficulty, question) {
  let dbQuestion = await QuestionModel.findOneAndUpdate(
    { _id: id },
    { question: question, difficulty: difficulty }
  );
  return dbQuestion;
}
