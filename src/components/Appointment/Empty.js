import React from "react";

// The component that lets you click and start making a new appointment

const Empty = props => {
  return (
    <main className="appointment__add">
      <img
        onClick={() => props.onAdd()}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
};

export default Empty;
