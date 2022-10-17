import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import QuestionList from './QuestionList';

const QuestionPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Link to="/question/create">New Question</Link>
      <QuestionList />
    </div>
  );
};

export default QuestionPage;
