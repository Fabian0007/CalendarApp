import moment from 'moment';
import { fromJS } from 'immutable';
import { createCalendarMonth, generateUUID } from '../utils/util';

export const actions = {
  CALENDAR_PREV_MONTH: { type: 'CALENDAR_MOVE_MONTH', payload: -1 },
  CALENDAR_NEXT_MONTH: { type: 'CALENDAR_MOVE_MONTH', payload: 1 },
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
    [newMonthIndex]: state.getIn(['year'])[newMonthIndex] ? state.getIn(['year'])[newMonthIndex] : createCalendarMonth(updatedStartWeek, updatedEndWeek, yearValue)
  };
  return state
    .setIn(['currentMonthIndex'], newMonthIndex)
    .setIn(['month'], fromJS(updatedYearCalendar[newMonthIndex]))
    .setIn(['year'], updatedYearCalendar)
    .setIn(['yearValue'], yearValue);
}

export default function reducer(state, action) {
  if (!action.type) {
    if (action.key instanceof Array) {
      return state.setIn(action.key, action.payload);
    }
    return state.set(action.key, action.payload);
  }
  switch (action.type) {
    case 'CALENDAR_MOVE_MONTH':
      return moveMonthCalendar(state, action.payload);
    case 'ADD_REMINDER': {
      const updatedMonth = state.getIn(['month']).toJS().map((week, index) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex];
          dayToUpdate.reminders.push({
            text: '',
            date: moment(),
            color: '#5265ff',
            open: true,
            newReminder: true,
            city: '',
            uuid: generateUUID(),
            parentDayUuid: week.days[action.payload.weekdayIndex].uuid,
            grandparentUuid: week.uuid,
          });
        }

        return week;
      });
      return state.setIn(['month'], fromJS(updatedMonth));
    }
    case 'EDIT_REMINDER': {
      const updatedMonth = state.getIn(['month']).map((week, index) => {
        if (action.payload.weekIndex !== index) {
          return week;
        }
        const dayToUpdate = week.getIn(['days', action.payload.weekdayIndex]);
        return week.setIn(['days', action.payload.weekdayIndex, 'reminders'], dayToUpdate.getIn(['reminders']).map((reminder) => {
          if (reminder.getIn(['uuid']) !== action.payload.reminder.uuid) {
            return reminder;
          }
          return reminder
            .setIn(['text'], action.payload.reminder.text)
            .setIn(['open'], action.payload.reminder.open)
            .setIn(['newReminder'], action.payload.reminder.newReminder)
            .setIn(['color'], action.payload.reminder.color)
            .setIn(['city'], action.payload.reminder.city)
            .setIn(['weather'], action.payload.reminder.weather)
            .setIn(['temperature'], action.payload.reminder.temperature)
            .setIn(['startTime'], action.payload.reminder.startTime);
        }));
      });
      return state.setIn(['month'], fromJS(updatedMonth));
    }
    case 'DELETE_REMINDER': {
      const updatedMonth = state.getIn(['month']).map((week, index) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.getIn(['days', action.payload.weekdayIndex]);
          return week.setIn(['days', action.payload.weekdayIndex, 'reminders'],
            dayToUpdate.getIn(['reminders']).filter(reminder => reminder.getIn(['uuid']) !== action.payload.reminder.uuid));
        }
        return week;
      });
      return state.setIn(['month'], fromJS(updatedMonth));
    }
    default:
      return state;
  }
}
