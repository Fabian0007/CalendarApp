import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentMonthTitle: PropTypes.string.isRequired,
  nextMonthAction: PropTypes.func.isRequired,
  prevMonthAction: PropTypes.func.isRequired,
};

const CalendarNav = ({ currentMonthTitle, nextMonthAction, prevMonthAction }) => (
  <div className="calendar__nav">
    <button type="button" onClick={prevMonthAction}>◀</button>
    <h2>
      {currentMonthTitle}
    </h2>
    <button type="button" onClick={nextMonthAction}>▶</button>
  </div>
);

CalendarNav.propTypes = propTypes;

export default CalendarNav;
