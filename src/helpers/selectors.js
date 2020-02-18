export function getAppointmentsForDay(state, dayName) {
  const selectedDay = state.days.filter(day => day.name === dayName);
  
  if (selectedDay.length === 0) {
    return selectedDay;
  }
  const appointmentsForDay = selectedDay[0].appointments;
  const appointments = appointmentsForDay.map(app => state.appointments[app])
  
  return appointments;
}