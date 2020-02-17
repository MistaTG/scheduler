import React from "react";

import "components/DayListItem.scss";

let classNames = require('classnames')

export default function DayListItem(props) {

  const listClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected 
  }, {
    'day-list__item--full': props.spots === 0 
  })

  function formatSpots(spots) {
    let spotString = `${spots} spots remaining`;

    if (spots === 0) {
      spotString = 'no spots remaining';
    } else if (spots === 1) {
      spotString = '1 spot remaining'
    }

    return spotString;
  }

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}