import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_QUESTION_SVC } from "../configs";
import QuestionUpdate from "./QuestionUpdate";

import cancelIcon from "../Images/cancel.png";

const QuestionList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [questionID, setquestionID] = useState(null);

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
      {questions.map((question) =>
        questionID === question._id ? (
          <div>
            <img
              src={cancelIcon}
              id="question-cancel-button"
              onClick={() => {
                setquestionID(null);
              }}
            />
            <QuestionUpdate id={questionID}></QuestionUpdate>
          </div>
        ) : (
          <div
            className="question-preview"
            key={question._id}
            onClick={() => {
              setquestionID(question._id);
              // navigate(`/question/update/${question._id}`);
            }}
          >
            <h2
              style={
                question.difficulty === "High"
                  ? { color: "#FF6464" }
                  : question.difficulty === "Low"
                  ? { color: "#54B435" }
                  : { color: "#FF884B" }
              }
            >
              {question.difficulty === "High"
                ? "hard"
                : question.difficulty === "Low"
                ? "easy"
                : "medium"}
            </h2>
            <p>{question.question}</p>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionList;
