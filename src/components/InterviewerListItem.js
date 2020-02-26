import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require("classnames");

export default function InterviewerListItem(props) {
  const listClass = classNames(
    "interviewers__item",
    {
      "interviewers__item-image": props.avatar
    },
    {
      "interviewers__item--selected": props.selected
    }
  );

  return (
    <li className={listClass} onClick={props.setInterviewer}>
      <img className={listClass} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
