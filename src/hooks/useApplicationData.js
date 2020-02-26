import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW
} from "../reducers/application";

// The primary hook for the application

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // The function that sets the day state
  const setDay = day => dispatch({ type: SET_DAY, day });

  // Load in the data from the api, only once on DOM load
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(promise1),
      Promise.resolve(promise2),
      Promise.resolve(promise3)
    ]).then(all => {
      const [days, appointments, interviewers] = all;

      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      });
    });
  }, []);

  function bookInterview(id, interview) {
    // Sets the new appointment data in a format the api can take in
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Finds out the days, which day is selected, and the appointment length for that day.
    const dayArray = state.days.map(day => day.name);
    const dayId = dayArray.findIndex(day => day === state.day);
    const dayAppLength = state.days[dayId].appointments.length;
    let spots = dayAppLength;

    // Decrement spots if there is a interview
    for (let i = 1; i <= dayAppLength; i++) {
      if (appointments[i].interview) {
        spots--;
      }
    }

    // Update spots for the day
    const days = state.days.map(day => {
      if (state.day === day.name) {
        return { ...day, spots };
      } else {
        return day;
      }
    });

    return Promise.resolve(
      axios
        .put(`/api/appointments/${id}`, appointments[id])
        .then(() => dispatch({ type: SET_INTERVIEW, appointments, days }))
    );
  }

  function cancelInterview(id) {
    // Sets the new appointment data to rewrite
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Increment spots for the day
    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots++;
        return { ...day, spots: day.spots++  };
      } else {
        return day;
      }
    });

    return Promise.resolve(
      axios
        .delete(`/api/appointments/${id}`, appointments[id])
        .then(() => dispatch({ type: SET_INTERVIEW, appointments, days }))
    );
  }

  // What to return to export from this function
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
