import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  startTime: PropTypes.instanceOf(moment),
  weather: PropTypes.string,
  temperature: PropTypes.string,
};

const defaultProps = {
  text: '',
  color: '#4a86e8',
  startTime: moment(),
  weather: '',
  temperature: '',
};

function ReminderLabel({
  text, startTime, color, handleClick, weather, temperature,
}) {
  const labelClassList = ['reminder__label'];
  switch (color) {
    case '#000000':
      labelClassList.push('reminder__label--black');
      break;
    case '#404040':
      labelClassList.push('reminder__label--hard-gray');
      break;
    case '#808080':
      labelClassList.push('reminder__label--medium-gray');
      break;
    case '#c0c0c0':
      labelClassList.push('reminder__label--soft-gray');
      break;
    case '#ffffff':
      labelClassList.push('reminder__label--white');
      break;
    case '#980000':
      labelClassList.push('reminder__label--brown');
      break;
    case '#ff0000':
      labelClassList.push('reminder__label--red');
      break;
    case '#ff9900':
      labelClassList.push('reminder__label--orange');
      break;
    case '#ffff00':
      labelClassList.push('reminder__label--yellow');
      break;
    case '#00ff00':
      labelClassList.push('reminder__label--green');
      break;
    case '#00ffff':
      labelClassList.push('reminder__label--soft-blue');
      break;
    case '#4a86e8':
      labelClassList.push('reminder__label--medium-blue');
      break;
    case '#0000ff':
      labelClassList.push('reminder__label--blue');
      break;
    case '#9900ff':
      labelClassList.push('reminder__label--purple');
      break;
    case '#ff00ff':
      labelClassList.push('reminder__label--pink');
      break;
    default:
      labelClassList.push('reminder__label--medium-blue');
      break;
  }
  if (text === '') {
    text = 'New Reminder';
  }
  return (
    <div
      role="button"
      tabIndex={0}
      className={labelClassList.join(' ')}
      onClick={handleClick}
      onKeyDown={handleClick}
      style={{ fontSize: 12 }}
    >
      {`${startTime.format('HH:mm')} ${text}`}
      { temperature && weather && ` (${temperature} - ${weather})`}
    </div>
  );
}

ReminderLabel.propTypes = propTypes;
ReminderLabel.defaultProps = defaultProps;

export default ReminderLabel;
