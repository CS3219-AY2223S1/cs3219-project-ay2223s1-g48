const Dropdown = (props) => {
  const DropdownItem = (props) => {
    return (
      <a href={props.link} className="dropdown-item">
        {props.children}
        <span className="right-icon">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div className="dropdown">
      <DropdownItem rightIcon={">"} link="/">
        My Account
      </DropdownItem>
      <DropdownItem link="/login">Log Out</DropdownItem>
    </div>
  );
};

export default Dropdown;
