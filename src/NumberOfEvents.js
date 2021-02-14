import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    alertText: ''
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
    this.props.updateEvents(null, null, value);

    if (value < 1) {
      this.setState({ alertText: 'Number must be 1 or greater' });
    } else {
      this.setState({ alertText: '' });
    }
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.alertText} />
        <label className='numberOfEventsInputLabel'>Number of events &nbsp;</label>
        <input type="number" className="numberOfEventsInput" onChange={this.handleNumberChanged} value={this.state.numberOfEvents}  min="1" max="32" />
      </div>
    );
  }
}

export default NumberOfEvents;