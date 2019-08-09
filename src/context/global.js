import React, { useContext, useReducer } from 'react';
import { fromJS } from 'immutable';
import reducers from '../reducers/global';
import Header from '../components/Header';
import '../scss/app.scss';

export const Global = React.createContext({});

export default () => {
  const globalStore = fromJS(useContext(Global));
  const [state, dispatch] = useReducer(reducers, globalStore);
  return (
    <Global.Provider value={{ state, dispatch }}>
      <Header />
    </Global.Provider>
  );
};