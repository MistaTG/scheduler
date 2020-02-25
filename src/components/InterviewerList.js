import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList({interviewers, interviewer , setInterviewer}) {

  InterviewerList.propTypes = {
    interviewer: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };
  
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    {interviewers.map(data => (
        <InterviewerListItem 
          key={data.id} 
          name={data.name} 
          avatar={data.avatar} 
          setInterviewer={() => setInterviewer(data.id)}
          selected={interviewer === data.id}
        ></InterviewerListItem>
      ))}
    </ul>
  </section>
  );
}