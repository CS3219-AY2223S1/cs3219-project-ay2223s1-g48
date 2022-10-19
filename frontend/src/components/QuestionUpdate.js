import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_QUESTION_SVC } from '../configs';

const QuestionUpdate = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [difficulty, setDifficulty] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const navigate = useNavigate();

  const getQuestions = async (signal) => {
    await axios
      .get(URL_QUESTION_SVC + '/' + id, signal)
      .then((res) => {
        const question = res.data.data;
        setQuestion(question);
        setDifficulty(question.question.difficulty);
        setQuestionBody(question.question.question);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = { difficulty, questionBody };
    await axios.patch(URL_QUESTION_SVC + id, question).then((res) => {
      if (res.status === 200) {
        alert('question updated!');
      } else {
        console.log(res.data.message);
      }
      navigate('/');
    });
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getQuestions({ signal: abortCont.signal });

    return () => abortCont.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!question) return null;

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

        <button>Update Question</button>
      </form>
    </div>
  );
};

export default QuestionUpdate;
