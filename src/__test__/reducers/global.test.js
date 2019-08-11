import { fromJS } from 'immutable';
import reducers from '../../reducers/global';
import { globalState } from '../testUtilities/mockObjects';


describe('The Global Reducer', () => {
  const expectedStateImmutable = globalState.setIn(['month'], fromJS([{
    index: 0,
    uuid: 'b86ce442-6f0e-be21-860e-507721cf6025',
    weekIndex: 31,
    days: [{
      index: 0,
      parentWeekUuid: 'b86ce442-6f0e-be21-860e-507721cf6025',
      reminders: [{
        color: '#5265ff',
        open: true,
        city: '',
        text: '',
        parentDayUuid: '4c884ceb-48a3-926f-6547-4692f1b47bfa',
        grandparentUuid: 'b86ce442-6f0e-be21-860e-507721cf6025',
        newReminder: true,
      }],
      weekIndex: 31,
    }],

  }]));
  it('when you pass a ADD_REMINDER action must return a new state with a new reminder added', () => {
    const newStateImmutable = reducers(globalState, { type: 'ADD_REMINDER', payload: { weekIndex: 0, weekdayIndex: 0 } });
    const newState = newStateImmutable.toJS();
    const expectedState = expectedStateImmutable.toJS();
    const day = newState.month[0].days[0];
    delete day.date;
    delete day.uuid;
    delete day.reminders[0].uuid;
    delete day.reminders[0].date;
    expect(newState).toEqual(expectedState);
  });
});
