import { useState } from "react";
const NavItem = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="nav-item">
      <button
        href=""
        className="avatar-button"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {props.icon}
      </button>

      {isDropdownOpen && props.children}
    </div>
  );
};

export default NavItem;
