import React, { useContext } from 'react';
import moment from 'moment';
import CalendarNav from '../components/CalendarNav';
import GlobalState from '../context/global';
import { actions } from '../reducers/global';

const CalendarNavContainer = () => {
  const { state, dispatch } = useContext(GlobalState);
  const currentMonthIndex = state.getIn(['currentMonthIndex']);
  const currentMonthTitle = moment().startOf('month').add(currentMonthIndex, 'month').format('MMMM YYYY')
  const nextMonth = () => {
    dispatch(actions.CALENDAR_NEXT_MONTH);
  };
  const prevMonth = () => {
    dispatch(actions.CALENDAR_PREV_MONTH);
  };
  return (
    <CalendarNav
      nextMonthAction={nextMonth}
      prevMonthAction={prevMonth}
      currentMonthTitle={currentMonthTitle}
    />
  );
};

export default CalendarNavContainer;
