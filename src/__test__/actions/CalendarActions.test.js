import * as CalendarActions from '../../actions/CalendarActions';
import { dispatch } from '../testUtilities/mockObjects';

describe('The CalendarActions', () => {
  it('when call the function addReminder with 0,0 must call the function dispatch with ADD_REMINDER action and weekIndex and weekdayIndex equal to zero', () => {
    CalendarActions.default(0, 0, dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_REMINDER', payload: { weekIndex: 0, weekdayIndex: 0 } });
  });
});