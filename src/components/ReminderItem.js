import React from 'react';
import PropTypes from 'prop-types';
import ReminderForm from './ReminderForm';
import ReminderLabel from './ReminderLabel';
import Modal from 'react-responsive-modal';

const propTypes = {
  disabled: PropTypes.bool
}

const defaultProps = {
  text: 'New Reminder'
}

class ReminderItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: this.props.reminder.newReminder,
      active: false,
      color: this.props.reminder.color,
      text: this.props.reminder.text,
      city: this.props.reminder.city,
      startTime: this.props.reminder.startTime,
      open: this.props.modal,
      weather: this.props.reminder.weather,
      temperature: this.props.reminder.temperature,
    }
  }

  handleSave = (formFields) => {
    const updatedReminder = {
      ...this.props.reminder,
      ...formFields,
    }
    this.props.editReminder(this.props.weekIndex, this.props.weekdayIndex, updatedReminder);
    this.props.closeModal();
    this.setState({ ...updatedReminder, editing: false })
  }

  handleClick = () => {
    this.onOpenModal();
    this.setState({ active: !this.state.active, editing: true })
  }

  deleteReminder = () => {
    this.props.deleteReminder(this.props.weekIndex, this.props.weekdayIndex, this.props.reminder)
    this.setState({ open: false });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render () {
    const { open } = this.state;
    return (
      <div className="reminder">
        <ReminderLabel
          text={this.state.text}
          startTime={this.state.startTime}
          color={this.state.color}
          handleClick={this.handleClick}
          weather={this.state.weather}
          temperature={this.state.temperature}
        />
        <Modal open={open} onClose={this.onCloseModal} center>
          <ReminderForm
            text={this.state.text}
            color={this.state.color}
            city={this.state.city}
            weather={this.state.weather}
            startTime={this.props.reminder.startTime}
            editing={this.state.editing}
            onSave={(reminder) => {
              this.handleSave(reminder);
              this.onCloseModal();
            }}
            onDelete={this.deleteReminder}
          />
        </Modal>
      </div>
    )
  }
}

ReminderItem.propTypes = propTypes
ReminderItem.defaultProps = defaultProps

export default ReminderItem
