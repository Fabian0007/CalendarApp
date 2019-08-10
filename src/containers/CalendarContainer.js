import React, { useContext } from 'react';
import moment from 'moment';
import GlobalState from '../context/global';

const CalendarContainer = () => {
  const { state } = useContext(GlobalState);
  const month = state.getIn(['month']).toJS();

  function getDayClass(day) {
    const today = moment();
    const classes = ['week__day'];
    if (today > day && !today.isSame(day, 'd')) {
      classes.push('week__day--past');
    }
    if ((day.day() === 0 || day.day() === 6) && !today.isSame(day, 'd')) {
      classes.push('week__day--weekend');
    }
    if (today.isSame(day, 'd')) {
      classes.push('week__day--today');
    }
    return classes.join(' ');
  }

  function renderWeeks() {
    return month.map(week => (
      <div key={week.uuid} className="week">
        {week.days.map(weekday => (
          <div
            key={weekday.uuid}
            className={getDayClass(weekday.date)}
          >
            {weekday.date.format('D')}
          </div>
        ))}
      </div>
    ));
  }
  return (
    <div className="calendar__month">
      {renderWeeks()}
    </div>
  );
};

export default CalendarContainer;
