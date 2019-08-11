import moment from 'moment';

export const generateUUID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const createCalendarMonth = (startWeek, endWeek, year) => {
  const monthArray = [];
  for (
    let weekIndex = startWeek, weekArrayIndex = 0;
    weekIndex < endWeek + 1;
    weekIndex += 1, weekArrayIndex += 1
  ) {
    const weekUuid = generateUUID();
    monthArray.push({
      uuid: weekUuid,
      weekIndex,
      index: weekArrayIndex,
      days:
        Array(7)
          .fill({ id: 0 })
          .map((item, index) => {
            return {
              uuid: generateUUID(),
              parentWeekUuid: weekUuid,
              date: moment()
                .week(weekIndex)
                .startOf('week')
                .clone()
                .add(index, 'day')
                .add(year, 'year'),
              weekIndex,
              index,
              reminders: [],
            };
          }),
    });
  }
  return monthArray;
};

export default generateUUID;
