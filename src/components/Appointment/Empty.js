import React from 'react';

const Empty = (props) => {
  const CREATE = "CREATE";

  return ( 
    <main className="appointment__add">
      <img
        onClick={() => props.onAdd(CREATE)}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
   );
}
 
export default Empty;