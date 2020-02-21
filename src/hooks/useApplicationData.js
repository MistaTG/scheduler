import { useReducer, useEffect } from 'react';
import axios from "axios";

const useApplicationData = () => {
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  function reducer(state, {day, days, appointments, interviewers, type}) {
    switch (type) {
      case SET_DAY:
        return {...state, day: day}
      case SET_APPLICATION_DATA:
        return {...state, days: days.data, appointments: appointments.data, interviewers: interviewers.data}
      case SET_INTERVIEW:
        return {...state, days, appointments}
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, { day: "Monday", days: [], appointments: {}, interviewers: {}}  );

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3),
    ]).then((all) => {
      
      const [days, appointments, interviewers] = all;
      
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
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

    const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const dayId = dayArray.findIndex(day => day === state.day);
    const dayAppLength = state.days[dayId].appointments.length;
    let spots = 5;

    for (let i = 1; i <= dayAppLength; i++) {
      if (appointments[i].interview) {
        spots--;
      } else {
      }
    }

    const days = state.days.map(day => {
      if (state.day === day.name ) {
        return {...day, spots}
      } else {
        return day
      }
    })
    
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, 
      appointments[id]
      )
      .then(function (response) {
        dispatch({ type: SET_INTERVIEW, appointments, days });
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
    
    const days = state.days.map(day => {
      if (state.day === day.name ) {
        day.spots++;
        return {...day, spots: day.spots++}
      } else {
        return day
      }
    })

    return Promise.resolve(
      axios.delete(`/api/appointments/${id}`, 
      appointments[id]
      )
      .then(function (response) {
        console.log('app', appointments)
        dispatch({ type: SET_INTERVIEW, appointments, days});
        console.log('res', response);
      }))
  }


  return { state, setDay, bookInterview, cancelInterview };
}
 
export default useApplicationData;