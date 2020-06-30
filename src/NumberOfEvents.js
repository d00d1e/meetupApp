import React, { Component } from 'react';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
  }

  render() {
    return (
      <div className="numberOfEvents">
        <input type="text" className="numberOfEventsInput" value={this.state.numberOfEvents} onChange={this.handleNumberChanged} />
      </div>
    );
  }
}

export default NumberOfEvents;