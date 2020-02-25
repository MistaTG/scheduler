export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, {day, days, appointments, interviewers, type}) {
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