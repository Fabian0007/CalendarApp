const addReminder = (weekIndex, weekdayIndex, dispatch) => {
  dispatch({ type: 'ADD_REMINDER', payload: { weekIndex, weekdayIndex } });
};
export default addReminder;
