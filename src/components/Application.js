import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList.js"
import Appointments from "./Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));


  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ]).then((all) => {
      
      const [days, appointments, interviewer] = all;
      // console.log(days.data, appointments.data, interviewer.data);
      
      setState(prev => ({ day: state.day, days: days.data, appointments: appointments.data, interviewers: interviewer.data}))
    });
  }, []);

  const interviewersForDay = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, 
      appointments[id]
      )
      .then(function (response) {
        setState({...state, appointments})
        console.log('res', response);
      }))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.resolve(
      axios.delete(`/api/appointments/${id}`, 
      appointments[id]
      )
      .then(function (response) {
        setState({...state, appointments})
        console.log('res', response);
      }))
  }
  
  return (
          <main className="layout">
            <section className="sidebar">
              <img
                className="sidebar--centered"
                src="images/logo.png"
                alt="Interview Scheduler"
              />
              <hr className="sidebar__separator sidebar--centered" />
              {<DayList days={state.days} day={state.day} setDay={setDay} />}
              <nav className="sidebar__menu"></nav>
              <img
                className="sidebar__lhl sidebar--centered"
                src="images/lhl.png"
                alt="Lighthouse Labs"
              />
             </section>
      <section className="schedule">
        
        {getAppointmentsForDay(state, state.day).map(appointment => {
          const interview = getInterview(state, appointment.interview)
          return (
          <Appointments 
            key={appointment.id}
            interview={interview}
            id={appointment.id}
            time={appointment.time}
            interviewers={interviewersForDay}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        )})}
        <Appointments key="last" time="6pm" />
      </section>
    </main>
  );
}
