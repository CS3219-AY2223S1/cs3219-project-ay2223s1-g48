import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL_QUESTION_SVC } from "../configs";

const QuestionCreate = (props) => {
  const [difficulty, setDifficulty] = useState("hard");
  const [questionBody, setQuestionBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = { difficulty: difficulty, question: questionBody };
    await axios.post(URL_QUESTION_SVC, question).then((res) => {
      if (res.status === 201) {
        alert("Question created!");
      }
      // navigate(`/question/${props.username}`);
      window.location.reload(false);
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
          <option value="hard">hard</option>
          <option value="medium">medium</option>
          <option value="easy">easy</option>
        </select>
        <label>Question:</label>
        <textarea
          required
          value={questionBody}
          onChange={(e) => setQuestionBody(e.target.value)}
        ></textarea>

        <button id="create-question-button">Create Question</button>
      </form>
    </div>
  );
};

export default QuestionCreate;
