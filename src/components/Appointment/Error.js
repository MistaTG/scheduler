import React from "react";

// The Error component if something goes wrong

const Error = props => {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">{props.message}</h1>
        <h3 className="text--light">{props.errMessage}</h3>
      </section>
      <img
        onClick={props.onClose}
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
};

export default Error;
