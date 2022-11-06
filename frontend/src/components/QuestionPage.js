import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import QuestionList from "./QuestionList";
import QuestionCreate from "./QuestionCreate";

import plusIcon from "../Images/plus.png";
import cancelIcon from "../Images/cancel.png";

import Navbar from "./Navbar";
import NavItem from "./Navitem";
import MatchingTimer from "./MatchingTimer";
import Dropdown from "./Dropdown";

const QuestionPage = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const cookies = location.state && location.state.cookies;
  const jwt = cookies && cookies.cookies && cookies.cookies.jwt;
  let isLoggedIn = jwt;
  return (
    <div className="question-page">
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
            navigate(`/question/${params.username}`, {
              state: { cookies: location.state.cookies },
            });
          }}
        ></NavItem>
      </Navbar>
      <div className="content">
        {isInputOpen ? (
          <div>
            {/* <button
              id="question-cancel-button"
              onClick={() => {
                setIsInputOpen(false);
              }}
            >
              cancel
            </button> */}
            <img
              id="question-cancel-button"
              src={cancelIcon}
              onClick={() => {
                setIsInputOpen(false);
              }}
            />
            <QuestionCreate username={params.username} />
          </div>
        ) : (
          <img
            src={plusIcon}
            className="add-button"
            onClick={() => {
              setIsInputOpen(true);
              //navigate("/question/create");
            }}
          />
        )}
        <QuestionList />
      </div>
    </div>
  );
};

export default QuestionPage;
