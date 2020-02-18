import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList.js"
import Appointments from "./Appointment"
import { getAppointmentsForDay } from "../helpers/selectors";

import "components/Application.scss";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "4pm",
//     interview: {
//       student: "J. Jonah Jameson",
//       interviewer: {
//         id: 1,
//         name: "Spiderman",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "5pm",
//     interview: {
//       student: "The Hulk",
//       interviewer: {
//         id: 1,
//         name: "Iron Man",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}});

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));

  // let appointmentsForDay = [];

  useEffect(() => {
    const promise1 = state.day;
    const promise2 = axios.get("/api/days");
    const promise3 = axios.get("/api/appointments");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ]).then((all) => {
      
      const [day, second, appointments] = all;
      console.log(day, second.data, appointments.data);
      
      setState(prev => ({ day: day, days: second.data, appointments: appointments.data}))
    });
  }, []);
  
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
        
        {getAppointmentsForDay(state, state.day).map(appointment => (
          <Appointments 
            key={appointment.id}
            {...appointment}
          />
        ))}
        <Appointments key="last" time="6pm" />
      </section>
    </main>
  );
}
