import moment from 'moment';
import { fromJS } from 'immutable';
import { createCalendarMonth } from '../utils/util';

export const actions = {
    CALENDAR_PREV_MONTH: { type: 'CALENDAR_MOVE_MONTH', payload: -1},
    CALENDAR_NEXT_MONTH: { type: 'CALENDAR_MOVE_MONTH', payload: 1}
  };

function moveMonthCalendar(state, direction) {
    const newMonthIndex = state.getIn(['currentMonthIndex']) + direction;
    let yearValue = state.getIn(['yearValue']);
    const updatedStartWeek = moment().startOf('month').add(newMonthIndex, 'month').week();
    let updatedEndWeek = moment().endOf('month').add(newMonthIndex, 'month').week();
    if (updatedEndWeek === 5 && direction === 1) yearValue += 1;
    if (updatedEndWeek === 1 && direction === -1) yearValue -= 1;
    if (updatedEndWeek === 1) updatedEndWeek = moment().endOf('month').add(newMonthIndex, 'month').subtract(6, 'day').week() + 1;
    const updatedYearCalendar = {
      ...state.getIn(['year']),
      [state.getIn(['currentMonthIndex'])]: state.getIn(['month']),
      [newMonthIndex]: state.getIn(['year'])[newMonthIndex] ?  state.getIn(['year'])[newMonthIndex] : createCalendarMonth(updatedStartWeek, updatedEndWeek, yearValue)
    }
    return fromJS({
      ...state,
      currentMonthIndex: newMonthIndex,
      month: updatedYearCalendar[newMonthIndex],
      year: updatedYearCalendar,
      yearValue
    });
}

export default function reducer(state, action) {
    if (!action.type) {
      if (action.key instanceof Array) {
        return state.setIn(action.key, action.payload);
      }
      return state.set(action.key, action.payload);
    }
    switch(action.type){
        case 'CALENDAR_MOVE_MONTH':
            return moveMonthCalendar(state, action.payload);
        default:
            return state;
    }
  }  