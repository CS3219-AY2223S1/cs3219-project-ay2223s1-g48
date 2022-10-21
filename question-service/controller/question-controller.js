import {
  ormCreateQuestion as _createQuestion,
  ormGetQuestion as _getQuestion,
  ormDeleteQuestion as _deleteQuestion,
  ormGetAllQuestion as _getAllQuestion,
  ormUpdateQuestion as _updateQuestion,
  ormViewQuestion as _viewQuestion,
} from '../model/question-orm.js';

export async function getAllQuestion(req, res) {
  try {
    const resp = await _getAllQuestion();
    if (resp.err) {
      return res.status(400).json({ message: 'Could no retrieve Question' });
    } else {
      console.log('retrieved all questions successfully!');
      return res.status(200).json({
        data: resp.questions,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when retrieving queston' });
  }
}

export async function getQuestion(req, res) {
  try {
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
    const id = req.params.question_id;
    const resp = await _deleteQuestion(id);
    console.log(resp);
    if (resp.err) {
      return res.status(400).json({ message: 'Could not delete question' });
    } else {
      console.log('Question deleted successfully!');
      return res
        .status(200)
        .json({ message: 'Question deleted successfully!' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when deleting question!' });
  }
}

export async function viewQuestion(req, res) {
  try {
    const id = req.params.question_id;
    const resp = await _viewQuestion(id);
    console.log(resp);
    if (resp.err) {
      return res.status(400).json({ message: 'Could not retrieve question' });
    } else {
      console.log('Question retrieved successfully!');
      return res
        .status(200)
        .json({ message: 'Question retrieved successfully!', data: resp });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when retrieving question!' });
  }
}

export async function updateQuestion(req, res) {
  try {
    const id = req.params.question_id;
    const difficulty = req.body.difficulty;
    const question = req.body.question;
    const resp = await _updateQuestion(id, difficulty, question);
    console.log(resp);
    if (resp.err) {
      return res.status(400).json({ message: 'Could not update question' });
    } else {
      console.log('Question updated successfully!');
      return res
        .status(200)
        .json({ message: 'Question updated successfully!' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when updating question!' });
  }
}
