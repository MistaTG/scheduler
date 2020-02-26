import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Delete from "./Delete";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

// The main component that shows all the other appointment components

export default function Appointment(props) {
  // All the modes for the Appointment Commponent
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDITING = "EDITING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function onAdd() {
    transition(CREATE);
  }

  function onEdit() {
    transition(EDITING);
  }

  function onSave(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer
      };

      transition(SAVING);

      // Calls the bookInterview function, which is an axios call and renders the show state if successful
      props
        .bookInterview(props.id, interview)
        .then(res => transition(SHOW))
        .catch(err => transition(ERROR_SAVE, true));
    } else {
      transition(ERROR_SAVE);
    }
  }

  function onDelete() {
    transition(DELETE);
  }

  function onDeleting() {
    transition(DELETING, true);

    // Calls the cancelInterview function, which is an axios call and renders the empty state if successful
    props
      .cancelInterview(props.id)
      .then(res => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={onSave} />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={onSave}
        />
      )}
      {mode === DELETE && (
        <Delete
          message={"Are you sure you want to delete?"}
          onConfirm={onDeleting}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === ERROR_SAVE && (
        <Error
          message={"ERROR SAVING"}
          errMessage={"Oops looks like there was an error while saving"}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"ERROR DELETING"}
          errMessage={"Oops looks like there was an error while deleting"}
          onClose={back}
        />
      )}
    </article>
  );
}
