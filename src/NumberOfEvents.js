import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
    this.props.updateEvents(null, null, value);
  }

  render() {
    return (
      <div className="numberOfEvents">
        <label className='numberOfEventsInputLabel'>Number of events: </label>
        <input type="number" className="numberOfEventsInput" onChange={this.handleNumberChanged} value={this.state.numberOfEvents}  min="1" max="32" />
      </div>
    );
  }
}

export default NumberOfEvents;