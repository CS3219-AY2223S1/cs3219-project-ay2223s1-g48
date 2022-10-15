import {
  ormCreateQuestion as _createQuestion,
  ormGetQuestion as _getQuestion,
  ormDeleteQuestion as _deleteQuestion,
} from '../model/question-orm.js';

export async function getAllQuestion(req, res) {}

export async function getQuestion(req, res) {
  try {
    console.log(req.params.difficulty);
    const difficulty = req.params.difficulty;
    if (difficulty) {
      const resp = await _getQuestion(difficulty);
      console.log(resp);
      if (resp.err) {
        return res.status(400).json({ message: 'Could not retrieve Question' });
      } else {
        console.log(`retrieved question ${difficulty} successfully!`);
        return res.status(200).json({
          data: resp.question,
        });
      }
    } else {
      return res.status(400).json({ message: 'Difficulty is missing' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when retrieving queston' });
  }
}

export async function createQuestion(req, res) {
  try {
    const { difficulty, question } = req.body;
    if (difficulty && question) {
      const resp = await _createQuestion(difficulty, question);
      console.log(resp);
      if (resp.err) {
        return res.status(400).json({ message: 'Could not create question' });
      } else {
        console.log(
          `Created new question difficulty: ${difficulty} successfully!`
        );
        return res.status(201).json({
          message: `Created new question difficulty: ${difficulty} successfully!`,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Difficulty and/or Question are missing!' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when creating new user!' });
  }
}

export async function deleteQuestion(req, res) {
  try {
    const { index, difficulty } = req.body;
    if (index && difficulty) {
      const resp = await _deleteQuestion(index, difficulty);
      console.log(resp);
      if (resp.err) {
        return res.status(400).json({ message: 'Could not delete question' });
      } else {
        console.log('Question deleted successfully!');
        return res
          .status(200)
          .json({ message: 'Question deleted successfully!' });
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Index and/or difficulty are missing!' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when deleting question!' });
  }
}
