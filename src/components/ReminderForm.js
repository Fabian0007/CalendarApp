import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../api/WeatherResource';

const propTypes = {
  onSave: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  startTime: PropTypes.instanceOf(moment),
}

const defaultProps = {
  text: '',
  color: '#5265ff',
  startTime: moment(),
  city: '',
}

class CalendarReminderForm extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      text: this.props.text,
      color: this.props.color,
      startTime: this.props.startTime,
      city: this.props.city,
      weather: this.props.weather,
    }

    this.toggleIsActive = this.toggleIsActive.bind(this)
  }

  to = (promise) => {
    return promise.then(data => data).catch(() => null);
  }

  onColorChange = event => {
    this.setState({ color: event.target.value })
  }

  onCityChange = event => {
    this.setState({ city: event.target.value })
  }

  onChange = e => {
    this.setState({ text: e.target.value })
  }

  toggleIsActive () {
    this.setState({ active: !this.state.active })
  }

  handleSubmit = async(event) => {
    event.preventDefault()
    const { text, color, startTime, city } = this.state;
    const request = { city };
    let dataWeather = null;
    if(city !== '') {
      dataWeather = await this.to(api.get(request));
    }
    const updatedReminder = {
      text,
      startTime,
      color,
      city,
      temperature: !dataWeather ? '' : `${(parseInt(dataWeather.main.temp) - 273.15).toFixed(1)}°`,
      weather: !dataWeather ? '' : dataWeather.weather[0].description,
      newReminder: false,
      open: false
    };
    this.setState({ editing: false });
    this.props.onSave(updatedReminder);
  }

  onStartTimeChange = e => {
    this.setState({
      startTime: moment(e.target.value, 'HH:mm'),
    })
  }

  render () {
    if (this.props.editing === false) {
      return null;
    }
    return (
      <form>
        <div className="form-group">
          <label htmlFor="reminderFormTitle">Title</label>
          <input
            type="text"
            className="form-control"
            maxLength="30"
            id="reminderFormTitle"
            placeholder={this.props.placeholder || 'New reminder...'}
            value={this.state.text}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminderFormTime">Time</label>
          <input
            type="time"
            id="reminderFormTime"
            className="form-control"
            value={this.state.startTime.format('HH:mm')}
            onChange={this.onStartTimeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminderFormCity">City</label>
          <select
            type="text"
            id="reminderFormCity"
            className="form-control"
            value={this.state.city}
            onChange={this.onCityChange}
          >
            <option value =""></option>
            <option value ="Cali,CO">Cali, Colombia</option>
            <option value ="Medellín,CO">Medellín, Colombia</option>
            <option value ="Bogotá,CO">Bogotá, Colombia</option>
            <option value ="London,UK">Londres, Inglaterra</option>
            </select> 
        </div>
        <div className="form-group">
          <label htmlFor="reminderFormColor">Color</label>
          <input
            type="color"
            id="reminderFormColor"
            className="form-control color"
            list="presetColors"
            value={this.state.color}
            onChange={this.onColorChange}
        />
        </div>
        <button type="button" className="btn btn-primary mr-5" onClick={this.handleSubmit}>Save</button>
        <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
      </form>
    )
  }
}

CalendarReminderForm.propTypes = propTypes
CalendarReminderForm.defaultProps = defaultProps

export default CalendarReminderForm
