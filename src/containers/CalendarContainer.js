import React, { useContext } from 'react';
import moment from 'moment';
import GlobalState from '../context/global';
import * as CalendarActions from '../actions/CalendarActions';
import ReminderItem from '../components/ReminderItem';

const CalendarContainer = () => {
  const { state, dispatch } = useContext(GlobalState);
  const month = state.getIn(['month']).toJS();
  const modal = state.getIn(['modal']);

  function handleClick(weekIndex, weekdayIndex) {
    dispatch({ key: 'modal', payload: true });
    CalendarActions.default(weekIndex, weekdayIndex, dispatch);
  }

  const editReminder = (weekIndex, weekdayIndex, reminder) => {
    dispatch({ type: 'EDIT_REMINDER', payload: { weekIndex, weekdayIndex, reminder } });
  };

  const deleteReminder = (weekIndex, weekdayIndex, reminder) => {
    dispatch({ type: 'DELETE_REMINDER', payload: { weekIndex, weekdayIndex, reminder } });
  };

  const closeModal = () => {
    dispatch({ key: 'modal', payload: false });
  };

  function getDayClass(day) {
    const today = moment();
    const classes = ['week__day'];
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
            <div
              role="button"
              tabIndex={0}
              className="full"
              onClick={() => handleClick(week.index, weekday.index)}
              onKeyDown={() => handleClick(week.index, weekday.index)}
            >
              {weekday.date.format('D')}
            </div>
            {weekday.reminders.map(reminder => (
              <ReminderItem
                key={reminder.uuid}
                reminder={reminder}
                weekIndex={week.index}
                weekdayIndex={weekday.index}
                editReminder={editReminder}
                deleteReminder={deleteReminder}
                modal={modal}
                closeModal={closeModal}
              />
            ))}
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
