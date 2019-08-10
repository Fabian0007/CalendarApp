import React from 'react';
import moment from 'moment';
import { createCalendarMonth } from '../utils/util';


const initialStartWeek = moment().startOf('month').add(0, 'month').week();
const initialEndWeek = moment().endOf('month').add(0, 'month').week();
const currentMonth = createCalendarMonth(initialStartWeek, initialEndWeek);

export const Global = React.createContext({
  currentMonthIndex: 0,
  month: currentMonth,
  year: { 0: currentMonth },
  yearValue: 0,
});

export default Global;
