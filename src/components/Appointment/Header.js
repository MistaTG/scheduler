import React from "react";

// The component that shows the time slot

const Header = props => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};

export default Header;
