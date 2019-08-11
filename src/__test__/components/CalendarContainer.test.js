import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as CalendarActions from '../../actions/CalendarActions';
import { Global } from '../../context/global';
import CalendarContainer from '../../containers/CalendarContainer';
import { dispatch, globalState } from '../testUtilities/mockObjects';

describe('The component CalendarContainer', () => {
  const { container } = render(
    <Global.Provider value={{
      state: globalState,
      dispatch,
    }}
    >
      <CalendarContainer />
    </Global.Provider>,
  );
  it('when you double click on a date must call the function addReminder', () => {
    jest.spyOn(CalendarActions, 'default');
    fireEvent.click(container.querySelector('.full'));
    expect(CalendarActions.default).toHaveBeenCalled();
  });
});
