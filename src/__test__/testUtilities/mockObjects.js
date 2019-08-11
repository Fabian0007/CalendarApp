import { fromJS } from 'immutable';
import moment from 'moment';

export const dispatch = jest.fn();

export const globalState = fromJS({
  month: [{
    index: 0,
    uuid: 'b86ce442-6f0e-be21-860e-507721cf6025',
    weekIndex: 31,
    days: [{
      date: moment(),
      index: 0,
      parentWeekUuid: 'b86ce442-6f0e-be21-860e-507721cf6025',
      reminders: [],
      uuid: '4c884ceb-48a3-926f-6547-4692f1b47bfa',
      weekIndex: 31,
    }],
  }],
});

export default globalState;
