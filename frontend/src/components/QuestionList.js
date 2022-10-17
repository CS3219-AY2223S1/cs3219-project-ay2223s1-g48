import  { useState, useEffect } from "react";
import axios from 'axios';

const QuestionList = () => {
    const [questions, setQuestions] = useState(null);
    


    const handleDelete = async (id) => {
        const newQuestions = questions.filter((question) => question._id !== id);
          axios
          .delete()
          .then((res) => {
            if (res.status === 200) {
              alert('Question deleted!');
              setQuestions(newQuestions);
            }
          }).catch(err=> {
            console.log(err.message);
          });
      }

    if(!questions)
        return null

    return ( 
        <div className="questionList">
            {questions.map((question) => (
          <div className="question-preview" key = {question._id}> 
            <Link to={`/questions/${question._id}`}>
              <h2>{question.difficulty}</h2>
                <p>{question.question}</p>
              <button onClick={() => handleDelete(question._id)}>delete question</button>
            </Link>
          </div>
        ))}
        </div>
    );
}
 
export default QuestionList;