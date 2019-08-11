import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentMonthTitle: PropTypes.string.isRequired,
  nextMonthAction: PropTypes.func.isRequired,
  prevMonthAction: PropTypes.func.isRequired,
};

const CalendarNav = ({ currentMonthTitle, nextMonthAction, prevMonthAction }) => (
  <div className="calendar__nav">
    <button type="button" onClick={prevMonthAction}>&lt;</button>
    <button type="button" onClick={nextMonthAction}>&gt;</button>
    <h2>
      {currentMonthTitle}
    </h2>
  </div>
);

CalendarNav.propTypes = propTypes;

export default CalendarNav;
