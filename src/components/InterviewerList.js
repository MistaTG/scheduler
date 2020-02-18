import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList({interviewers, interviewer , setInterviewer}) {
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    {interviewers.map(data => (
        <InterviewerListItem 
          key={data.id} 
          name={data.name} 
          avatar={data.avatar} 
          setInterviewer={event => setInterviewer(data.id)}
          selected={interviewer === data.id}
        ></InterviewerListItem>
      ))}
    </ul>
  </section>
  );
}