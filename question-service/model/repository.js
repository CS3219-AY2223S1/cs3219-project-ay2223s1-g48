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
  let index = 0;
  let questionCount = await QuestionModel.countDocuments({
    difficulty: paramDifficulty,
  });
  console.log(questionCount);
  if (questionCount == 0) {
    index = 1;
  } else {
    index = await QuestionModel.find({ difficulty: paramDifficulty })
      .sort({ index: -1 })
      .limit(1);
    index = index[0].index + 1;
  }
  return new QuestionModel({
    index: index,
    difficulty: paramDifficulty,
    question: question,
  });
}

export async function checkQuestionRange(params) {
  let size = await QuestionModel.countDocuments({
    difficulty: params.difficulty,
  });
  console.log(size);
  console.log(params.difficulty);
  return params.index <= size;
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

export async function deleteQuestion(params) {
  console.log('deleting question');
  let paramIndex = params.index;
  let paramDifficulty = params.difficulty;
  await QuestionModel.findOneAndDelete({
    index: paramIndex,
    difficulty: paramDifficulty,
  });
}
