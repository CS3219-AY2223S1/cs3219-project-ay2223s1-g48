import { useState } from "react";
const NavItem = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="nav-item">
      {props.type == "button" ? (
        <button
          href=""
          className="avatar-button"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {props.content}
        </button>
      ) : (
        <button className="tab" href={props.link} onClick={props.onClick}>
          {props.content}
        </button>
      )}

      {isDropdownOpen && props.children}
    </div>
  );
};

export default NavItem;
