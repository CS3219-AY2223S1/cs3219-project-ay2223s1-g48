import { CSSTransition } from "react-transition-group";
import { useState } from "react";
const Dropdown = (props) => {
  const [activeMenu, setActiveMenu] = useState("main"); //account
  console.log(activeMenu);

  const DropdownItem = (props) => {
    return (
      <a
        href={props.link}
        className="dropdown-item"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.leftIcon ? (
          <span className="left-icon">{props.leftIcon}</span>
        ) : (
          ""
        )}
        {props.children}
        {props.rightIcon ? (
          <span className="right-icon">{props.rightIcon}</span>
        ) : (
          ""
        )}
      </a>
    );
  };

  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem rightIcon={">"} goToMenu="account">
            My Account
          </DropdownItem>
          <DropdownItem link="/login">Log Out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "account"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem>Change Password</DropdownItem>
          <DropdownItem>Delete Account</DropdownItem>
          <DropdownItem leftIcon={"<"} goToMenu="main">
            Back
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
