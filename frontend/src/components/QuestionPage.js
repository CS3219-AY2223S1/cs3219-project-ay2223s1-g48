import { Link, useLocation } from "react-router-dom";
import QuestionList from "./QuestionList";

import Navbar from "./Navbar";
import NavItem from "./Navitem";
import MatchingTimer from "./MatchingTimer";
import Dropdown from "./Dropdown";

const QuestionPage = () => {
  const location = useLocation();
  const cookies = location.state && location.state.cookies;
  const jwt = cookies && cookies.cookies && cookies.cookies.jwt;
  let isLoggedIn = jwt;
  return (
    <div>
      {/* <Navbar /> */}
      <div className="content">
        <Link to="/question/create">New Question</Link>
        <QuestionList />
      </div>
    </div>
  );
};

export default QuestionPage;
