import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URL_QUESTION_SVC } from '../configs';

const QuestionList = () => {
  const [questions, setQuestions] = useState(null);

  const getQuestions = async (signal) => {
    await axios
      .get(URL_QUESTION_SVC, signal)
      .then((res) => {
        const questions = res.data.data;
        setQuestions(questions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getQuestions({ signal: abortCont.signal });

    return () => abortCont.abort();
  }, []);

  if (!questions) return null;

  return (
    <div className="questionList">
      {questions.map((question) => (
        <div className="question-preview" key={question._id}>
          <Link to={`/question/update/${question._id}`}>
            <h2>{question.difficulty}</h2>
            <p>{question.question}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
