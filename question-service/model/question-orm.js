import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestion,
  viewQuestion,
  updateQuestion,
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

export async function ormDeleteQuestion(id) {
  try {
    await deleteQuestion(id);
    return true;
  } catch (err) {
    console.log('ERROR: could not delete question');
    return { err };
  }
}

export async function ormViewQuestion(id) {
  try {
    const question = await viewQuestion(id);
    return { question };
  } catch (err) {
    console.log('ERROR: could not view question');
    return { err };
  }
}

export async function ormUpdateQuestion(id, difficulty, question) {
  try {
    const updatedQuestion = await updateQuestion(id, difficulty, question);
    updatedQuestion.save();
    return true;
  } catch (err) {
    console.log('ERROR: could not view question');
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
