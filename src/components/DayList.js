import React from "react";

import DayListItem from "./DayListItem";

export default function DayList({ days, day, setDay }) {
  return (
    <ul>
      {days.map(dayData => (
        <DayListItem
          key={dayData.id}
          name={dayData.name}
          spots={dayData.spots}
          setDay={setDay}
          selected={day === dayData.name}
        />
      ))}
    </ul>
  );
}
