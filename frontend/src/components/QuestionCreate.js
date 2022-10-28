import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL_QUESTION_SVC } from '../configs';

const QuestionCreate = () => {
  const [difficulty, setDifficulty] = useState('High');
  const [questionBody, setQuestionBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = { difficulty: difficulty, question: questionBody };
    await axios.post(URL_QUESTION_SVC, question).then((res) => {
      if (res.status === 201) {
        alert('contact created!');
      }
      navigate('/question');
    });
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Question Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Med">Med</option>
          <option value="Low">Low</option>
        </select>
        <label>Question:</label>
        <textarea
          required
          value={questionBody}
          onChange={(e) => setQuestionBody(e.target.value)}
        ></textarea>

        <button>Create Question</button>
      </form>
    </div>
  );
};

export default QuestionCreate;
