import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";

import Navbar from "./Navbar";
import NavItem from "./Navitem";
import MatchingTimer from "./MatchingTimer";
import Dropdown from "./Dropdown";

const QuestionPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const cookies = location.state && location.state.cookies;
  const jwt = cookies && cookies.cookies && cookies.cookies.jwt;
  let isLoggedIn = jwt;
  return (
    <div>
      <Navbar username={params.username}>
        <NavItem type="button" content={params.username[0].toUpperCase()}>
          <Dropdown username={params.username} />
        </NavItem>
        <NavItem
          type="tab"
          link={`/matching/${params.username}`}
          content="Home"
          onClick={() => {
            navigate("/matching/" + params.username, {
              state: { cookies: location.state.cookies },
            });
          }}
        ></NavItem>
        <NavItem
          type="tab"
          link={`/question/`}
          content="Manage Questions"
          onClick={() => {
            navigate("/question/", {
              state: { cookies: location.state.cookies },
            });
          }}
        ></NavItem>
      </Navbar>
      <div className="content">
        <Link to="/question/create">New Question</Link>
        <QuestionList />
      </div>
    </div>
  );
};

export default QuestionPage;
