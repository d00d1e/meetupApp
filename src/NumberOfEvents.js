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
        <input type="text" className="numberOfEventsInput" onChange={this.handleNumberChanged} value={this.state.numberOfEvents}  />
      </div>
    );
  }
}

export default NumberOfEvents;