export function getAppointmentsForDay(state, dayName) {
  const selectedDay = state.days.filter(day => day.name === dayName);
  
  if (selectedDay.length === 0) {
    return selectedDay;
  }

  const appointmentsForDay = selectedDay[0].appointments;
  const appointments = appointmentsForDay.map(app => state.appointments[app]);
  
  return appointments;
}

export function getInterviewersForDay(state, dayName) {
  const selectedDay = state.days.filter(day => day.name === dayName);
  
  if (selectedDay.length === 0) {
    return selectedDay;
  };
  const interviewsForDay = selectedDay[0].interviewers;
  const interviews = interviewsForDay.map(inter => state.interviewers[inter]);
  // console.log('test', interviews)
  
  return interviews;
}


export function getInterview(state, interview) {
  if (!interview || !state) {
    return null
  };

  const results = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return results;
}
