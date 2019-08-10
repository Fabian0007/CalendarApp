import React, { useContext, useReducer } from 'react';
import { fromJS } from 'immutable';
import { Global } from '../context/global';
import reducers from '../reducers/global';
import Header from '../components/Header';
import CalendarContainer from '../containers/CalendarContainer';
import CalendarHeader from '../components/CalendarHeader';
import CalendarNavContainer from '../containers/CalendarNavContainer';
import '../scss/app.scss';

export default () => {
  const globalStore = fromJS(useContext(Global));
  const [state, dispatch] = useReducer(reducers, globalStore);
  return (
    <Global.Provider value={{ state, dispatch }}>
      <Header />
      <CalendarNavContainer />
      <CalendarHeader />
      <CalendarContainer />
    </Global.Provider>
  );
};
