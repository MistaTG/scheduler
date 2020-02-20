import { useState, useEffect } from 'react';
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => setState(prev => ({ ...prev, day }));

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
      
      setState(prev => ({ day: state.day, days: days.data, appointments: appointments.data, interviewers: interviewer.data}))
    });
  }, []);

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


  return { state, setDay, bookInterview, cancelInterview };
}
 
export default useApplicationData;