import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  checkQuestionRange,
  getAllQuestion,
} from './repository.js';

export async function ormCreateQuestion(difficulty, question) {
  try {
    const newQuestion = await createQuestion({ difficulty, question });
    newQuestion.save();
    return true;
  } catch (err) {
    console.log('ERROR: Could not create new question');
    return { err };
  }
}

export async function ormDeleteQuestion(index, difficulty) {
  try {
    const inRange = await checkQuestionRange({ index, difficulty });
    if (inRange) {
      await deleteQuestion({ index, difficulty });
      return true;
    } else {
      const err = new Error('ERROR: Question index does not exist');
      console.log(err.message);
      throw err;
    }
  } catch (err) {
    console.log('ERROR: could not delete question');
    return { err };
  }
}

export async function ormGetQuestion(difficulty) {
  try {
    const question = await getQuestion(difficulty);
    return { question };
  } catch (err) {
    console.log('ERROR: could not retrieve question');
    return { err };
  }
}

export async function ormGetAllQuestion() {
  try {
    const questions = await getAllQuestion();
    return { questions };
  } catch (err) {
    console.log('ERROR: could not retrieve questions');
    return { err };
  }
}
